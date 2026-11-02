import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, streamText, type UIMessage } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { achievements, education, experience, profile, projects, skillGroups, technologies } from '@/lib/profile'

export const maxDuration = 30
const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

function getAuthStatus() {
  const geminiApiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    (process.env.AI_GATEWAY_API_KEY?.startsWith('AQ.') || process.env.AI_GATEWAY_API_KEY?.startsWith('AIza')
      ? process.env.AI_GATEWAY_API_KEY
      : undefined)
  const hasDirectGeminiAuth = Boolean(geminiApiKey)
  const hasGatewayAuth = Boolean((process.env.AI_GATEWAY_API_KEY && !hasDirectGeminiAuth) || process.env.VERCEL_OIDC_TOKEN)
  return {
    hasGatewayAuth,
    hasDirectGeminiAuth,
    geminiApiKey,
    hasAuth: hasGatewayAuth || hasDirectGeminiAuth,
  }
}

function localAnswer(question: string) {
  const q = question.toLowerCase()
  if (/education|degree|school|university|college|study|sgpa|b\.?tech|secondary/.test(q)) return education.map((item) => `${item.program}${item.result ? ` — ${item.result}` : ''}, ${item.institution} (${item.dates}), ${item.location}.`).join('\n')
  if (/skill|stack|technolog|language/.test(q)) return skillGroups.map((group) => `${group.category}: ${group.items.join(', ')}.`).join('\n')
  if (/project|built|sankhyasetu|putzen|karmatute|we.live|authora|library/.test(q)) {
    return projects.map((project) => `${project.name}: ${project.description} Stack: ${project.stack.join(', ')}.`).join('\n\n')
  }
  if (/experience|intern|organization|community|girlscript|itjobxs/.test(q)) return experience.map((item) => `${item.role} at ${item.organization}, ${item.dates} (${item.location}). ${item.details.join(' ')} Tech: ${item.stack.join(', ')}.`).join('\n\n')
  if (/achievement|contest|rating|dsa|contribution|problems solved|github contributions/.test(q)) return achievements.join('\n')
  if (/contact|email|phone|location|linkedin|github|youtube|leetcode|codeforces|resume|profile/.test(q)) {
    return `Contact Vardhan at ${profile.email} or ${profile.phone}. Profiles: LinkedIn ${profile.links.linkedin}, GitHub ${profile.links.github}, LeetCode ${profile.links.leetcode}, Codeforces ${profile.links.codeforces}, YouTube ${profile.links.youtube}. Resume: ${profile.links.resume}.`
  }
  return `${profile.name} is a ${profile.role}. ${profile.intro} Ask me about his projects, skills, experience, or profiles.`
}

function localStreamResponse(answer: string) {
  const stream = createUIMessageStream({
    execute({ writer }) {
      writer.write({ type: 'start' })
      writer.write({ type: 'text-start', id: 'portfolio-local-answer' })
      writer.write({ type: 'text-delta', id: 'portfolio-local-answer', delta: answer })
      writer.write({ type: 'text-end', id: 'portfolio-local-answer' })
    },
  })
  return createUIMessageStreamResponse({ stream })
}

export async function GET() {
  const { hasGatewayAuth, hasDirectGeminiAuth } = getAuthStatus()
  return Response.json({
    status: 'ok',
    mode: hasDirectGeminiAuth ? 'gemini' : hasGatewayAuth ? 'ai-gateway' : 'portfolio-fallback',
  })
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Send a valid JSON chat request.' }, { status: 400 })
  }

  const messages = (payload as { messages?: unknown } | null)?.messages
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return Response.json({ error: `Send between 1 and ${MAX_MESSAGES} recent messages.` }, { status: 400 })
  }
  if (!messages.every((message) => {
    if (!message || typeof message !== 'object') return false
    const item = message as Partial<UIMessage>
    return (item.role === 'user' || item.role === 'assistant') && Array.isArray(item.parts)
      && item.parts.every((part) => part && typeof part === 'object'
        && ((part as { type?: unknown }).type !== 'text' || typeof (part as { text?: unknown }).text === 'string' && (part as { text: string }).text.length <= MAX_MESSAGE_LENGTH))
  })) {
    return Response.json({ error: 'Messages must contain valid text and be under 2,000 characters each.' }, { status: 400 })
  }

  const latestQuestion = [...messages].reverse().find((message) => (message as UIMessage).role === 'user') as UIMessage | undefined
  const question = latestQuestion?.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join(' ')
    .slice(0, MAX_MESSAGE_LENGTH) || ''

  const { hasGatewayAuth, hasDirectGeminiAuth, geminiApiKey, hasAuth } = getAuthStatus()

  // Keep the portfolio assistant useful locally and in previews without requiring a hosted model key.
  if (!hasAuth) return localStreamResponse(localAnswer(question))

  const context = [
    `${profile.name} is a ${profile.role}. ${profile.intro} Phone: ${profile.phone}; email: ${profile.email}; location: ${profile.location}.`,
    `Education: ${education.map((item) => `${item.program}${item.result ? ` — ${item.result}` : ''}, ${item.institution} (${item.dates}), ${item.location}.`).join(' ')}`,
    `Skills: ${skillGroups.map((group) => `${group.category}: ${group.items.join(', ')}.`).join(' ')}`,
    `Experience: ${experience.map((item) => `${item.role} at ${item.organization}, ${item.dates} (${item.location}). ${item.details.join(' ')} Tech: ${item.stack.join(', ')}.`).join(' ')}`,
    `Achievements: ${achievements.join(' ')}`,
    `Featured technologies: ${technologies.join(', ')}.`,
    `Projects: ${projects.map((project) => `${project.name} (${project.type}): ${project.description} Stack: ${project.stack.join(', ')}.`).join(' ')}`,
    `Profiles: YouTube, LeetCode, Codeforces, LinkedIn, GitHub. GeeksforGeeks is mentioned in achievements but a profile URL has not been provided. Resume available from the portfolio.`,
  ].join('\n')

  try {
    const configuredModel = process.env.PORTFOLIO_CHAT_MODEL || 'google/gemini-flash-lite-latest'
    const model = hasDirectGeminiAuth && geminiApiKey
      ? createGoogleGenerativeAI({ apiKey: geminiApiKey })(configuredModel.replace(/^google\//, ''))
      : configuredModel

    const result = streamText({
      model,
      system: `You are ${profile.name}'s portfolio assistant. Answer questions about Vardhan, his projects, skills, coding profiles, YouTube channel, experience, and ways to contact him. Be concise, friendly, and factual. Use only this context:\n${context}\nIf a question is outside this context, say you can only answer about Vardhan's portfolio and suggest a relevant topic. Do not invent dates, metrics, employers, or project claims.`,
      messages: await convertToModelMessages(messages as UIMessage[]),
      maxOutputTokens: 500,
      abortSignal: request.signal,
    })

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('Portfolio chat stream failed:', error)
        return localAnswer(question)
      },
    })
  } catch (error) {
    console.error('Portfolio chat request failed:', error)
    return localStreamResponse(localAnswer(question))
  }
}

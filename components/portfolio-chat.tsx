'use client'

import { useState } from 'react'
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'
import { ArrowUpRight, MessageCircle, Send, X } from 'lucide-react'

export function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!input.trim() || status === 'submitted' || status === 'streaming') return
    clearError()
    sendMessage({ text: input.trim() })
    setInput('')
  }

  return (
    <aside className="portfolio-chat fixed bottom-5 right-5 z-50 w-[min(360px,calc(100vw-2rem))]">
      {open && (
        <div className="mb-3 overflow-hidden border border-blue-400/40 bg-[#090b20]/95 shadow-[0_0_50px_rgba(79,70,229,.22)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-blue-400/20 px-4 py-3">
            <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-blue-400 shadow-[0_0_12px_#6366f1]" /><span className="font-mono text-[10px] uppercase tracking-[.2em] text-violet-200">Portfolio assistant</span></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close portfolio assistant" className="text-white/50 transition hover:text-white"><X className="size-4" /></button>
          </div>
          <div className="flex max-h-64 flex-col gap-3 overflow-y-auto p-4">
            {messages.length === 0 && <p className="text-sm leading-6 text-white/55">Ask about Vardhan&apos;s projects, skills, coding profiles, or experience.</p>}
            {messages.map((message) => <div key={message.id} className={`max-w-[90%] text-sm leading-6 ${message.role === 'user' ? 'ml-auto border border-white/15 bg-white/10 px-3 py-2 text-white/85' : 'border-l-2 border-blue-400/70 pl-3 text-white/65'}`}>{message.parts.map((part, index) => part.type === 'text' ? <span key={`${message.id}-${index}`}>{part.text}</span> : null)}</div>)}
            {status === 'submitted' && <p className="font-mono text-[10px] uppercase tracking-[.18em] text-violet-300">Thinking…</p>}
            {error && <p role="alert" className="text-sm leading-5 text-violet-200">The assistant couldn&apos;t reply. Check the chat service configuration and try again.</p>}
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-blue-400/20 p-3"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question" aria-label="Ask the portfolio assistant" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/30" /><button type="submit" disabled={status === 'submitted' || status === 'streaming' || !input.trim()} aria-label="Send question" className="grid size-9 shrink-0 place-items-center bg-violet-600 text-white transition hover:bg-blue-400 disabled:opacity-40"><Send className="size-4" /></button></form>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto flex items-center gap-3 border border-violet-300/60 bg-violet-600 px-4 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-white shadow-[0_0_28px_rgba(99,102,241,.35)] transition hover:bg-blue-400"><MessageCircle className="size-4" /> Ask about my work <ArrowUpRight className="size-3" /></button>
    </aside>
  )
}

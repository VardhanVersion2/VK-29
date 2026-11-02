# VK-29

My Official Portfolio for Graduating as a B.tech CSE Engineer in 2029. Currently in 2nd year of college.

## Run locally

1. Install dependencies with `pnpm install` (or `npx pnpm install`).
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` to your Google AI Studio key (or `AI_GATEWAY_API_KEY`).
3. Run `npm run dev` (or `pnpm dev`) and open the local URL shown by Next.js.

The portfolio assistant answers with live AI responses from your portfolio context. Set `GEMINI_API_KEY` or `AI_GATEWAY_API_KEY` (or link a Vercel project with OIDC) to enable generated responses; `PORTFOLIO_CHAT_MODEL` can override the default `google/gemini-flash-lite-latest` model. Keep credentials on the server; never add them to a `NEXT_PUBLIC_` variable. `GET /api/chat` returns a health check and reports whether the assistant is using Gemini, AI Gateway, or the local fallback.

Technology and platform logos load from Simple Icons CDN and fall back to initials when a logo is unavailable. Experience entries use local icons/marks because the source project did not include organization brand assets.

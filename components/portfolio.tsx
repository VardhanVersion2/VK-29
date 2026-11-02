'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, BellRing, BriefcaseBusiness, Trophy, Users } from 'lucide-react'
import { achievements, education, experience, profile, projects, skillGroups, technologies } from '@/lib/profile'
import { PortfolioChat } from '@/components/portfolio-chat'

const platformItems = [
  { label: 'LeetCode', detail: 'Problem Solver', mark: 'LC', logo: 'leetcode', href: profile.links.leetcode },
  { label: 'Codeforces', detail: 'Competitive Programmer', mark: 'CF', logo: 'codeforces', href: profile.links.codeforces },
  { label: 'GeeksforGeeks', detail: 'Problem Solver', mark: 'GFG', logo: 'geeksforgeeks', href: profile.links.geeksforgeeks },
  { label: 'GitHub', detail: 'Developer', mark: 'GH', logo: 'github', href: profile.links.github },
  { label: 'LinkedIn', detail: 'Professional Network', mark: 'in', logo: 'linkedin', href: profile.links.linkedin },
  { label: 'YouTube', detail: 'Content & Learning', mark: 'YT', logo: 'youtube', href: profile.links.youtube },
  { label: 'GirlScript Summer of Code', detail: '2026', mark: 'GS', icon: Users, href: '#experience' },
  { label: 'ITJOBXS', detail: 'Software Engineer Intern', mark: 'IX', icon: BriefcaseBusiness, href: '#experience' },
]

const technologyIcons: Record<string, string> = {
  Java: 'java', Python: 'python', C: 'c', 'JavaScript (ES6+)': 'javascript', JavaScript: 'javascript',
  ReactJS: 'react', React: 'react', 'Spring Boot': 'springboot', Spring: 'spring', 'Spring Data JPA': 'spring',
  HTML: 'html5', HTML5: 'html5', CSS: 'css3', CSS3: 'css3', PostgreSQL: 'postgresql', MySQL: 'mysql',
  MongoDB: 'mongodb', Firebase: 'firebase', Git: 'git', GitHub: 'github', 'REST API': 'fastapi',
  'REST APIs': 'fastapi', 'AI / ML': 'tensorflow', 'Node.js': 'nodedotjs', ExpressJS: 'express',
  Bootstrap: 'bootstrap', 'Tailwind CSS': 'tailwindcss', NumPy: 'numpy', Pandas: 'pandas',
  PHP: 'php', Hibernate: 'hibernate', 'Google Gemini API': 'googlegemini', 'Leaflet API': 'leaflet',
  'Socket.io': 'socketdotio', 'Mistral AI': 'mistral', 'Google GenAI': 'google', GeeksforGeeks: 'geeksforgeeks',
}

function BrandMark({ slug, label, fallback, className = '' }: { slug?: string; label: string; fallback: string; className?: string }) {
  return <span aria-label={label} title={label} className={`brand-mark ${className}`}>
    {slug ? <img src={`https://cdn.simpleicons.org/${slug}`} alt="" loading="lazy" onLoad={(event) => { const fallback = event.currentTarget.nextElementSibling; if (fallback) fallback.setAttribute('hidden', '') }} onError={(event) => { event.currentTarget.hidden = true }} /> : null}
    {fallback ? <span aria-hidden="true">{fallback}</span> : null}
  </span>
}

function SafeLink({ href, children, className = '', external = true }: { href: string; children: React.ReactNode; className?: string; external?: boolean }) {
  if (!href) return <span className={`${className} cursor-default opacity-40`}>{children}</span>
  return <a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>
}

function YouTubeLogo({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>
}

function ExperienceSection() {
  return <section id="experience" className="border-y border-violet-300/15 bg-[#0b0b0b]"><div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 sm:px-12 sm:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-20"><div><p className="eyebrow text-violet-200/70">07 / Experience</p><h2 className="mt-5 max-w-sm text-4xl font-light leading-[0.95] tracking-[-0.06em] sm:text-6xl">Work that makes a difference<span className="text-violet-300">.</span></h2></div><div className="grid gap-4">{experience.map((item) => <article key={`${item.organization}-${item.role}`} className="resume-card p-6 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs uppercase tracking-[.17em] text-violet-200/70">{item.role}</p><h3 className="mt-2 text-2xl font-light">{item.organization}</h3></div><div className="sm:text-right"><p className="font-mono text-[10px] uppercase tracking-[.12em] text-white/45">{item.dates}</p><p className="mt-2 text-xs text-white/40">{item.location}</p></div></div><ul className="mt-6 space-y-3">{item.details.map((detail) => <li key={detail} className="flex gap-3 text-sm leading-6 text-white/60"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-300/70" />{detail}</li>)}</ul>{item.stack.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{item.stack.map((tool) => <span key={tool} className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 px-3 py-1.5 text-[10px] uppercase tracking-[.1em] text-white/55"><BrandMark slug={technologyIcons[tool]} label={tool} fallback={tool.slice(0, 1)} className="stack-mark" />{tool}</span>)}</div>}</article>)}</div></div></section>
}

function AchievementsSection() {
  return <section id="achievements" className="border-b border-violet-300/15"><div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-20 lg:py-28"><p className="eyebrow text-violet-200/70">08 / Achievements</p><h2 className="mt-5 text-4xl font-light tracking-[-0.06em] sm:text-6xl">Progress, measured in practice<span className="text-violet-300">.</span></h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{achievements.map((achievement, index) => <article key={achievement} className="resume-card flex gap-4 p-6"><span className="font-mono text-xs text-violet-200/70">0{index + 1}</span><p className="text-sm leading-6 text-white/65">{achievement}</p></article>)}</div></div></section>
}

function YouTubeSection() {
  const topics = [
    { number: '01', title: 'Data Structures & Algorithms', detail: 'Problem-solving walkthroughs, clear patterns, and implementation choices.' },
    { number: '02', title: 'Computer Science Concepts', detail: 'Core CS ideas explained for learning, revision, and interviews.' },
    { number: '03', title: 'Learn by Building', detail: 'Project-led lessons across Java, Spring Boot, JavaScript, and AI.' },
  ]

  return <section id="youtube" className="youtube-section border-b border-red-500/25 bg-[#100707]"><div className="mx-auto max-w-[1440px] px-8 py-24 sm:px-12 lg:px-20 lg:py-32"><div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><p className="eyebrow text-red-300/80"><YouTubeLogo className="mr-2 inline size-4" />04 / YouTube</p><h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.07em] sm:text-7xl">I love teaching <span className="text-red-400">DSA &amp; CS.</span></h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/60">CS educational content by me: DSA problem solving, core computer science concepts, and practical learning through code.</p></div><SafeLink href={profile.links.youtube} className="youtube-subscribe inline-flex items-center gap-3 self-start border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition lg:self-end"><BellRing className="bell-ring size-4" /> Subscribe <YouTubeLogo className="size-4" /></SafeLink></div><div className="youtube-frame mt-14"><SafeLink href={profile.links.youtube} className="youtube-card group"><div className="youtube-card__screen"><img src="/images/vardhan-hero.png" alt="Vardhan Kushwaha YouTube channel preview" className="youtube-thumbnail" /><span className="youtube-play">▶</span><span className="youtube-card__label">Vardhan Kushwaha / Watch the channel</span></div><div className="flex items-center justify-between border-t border-red-400/20 px-5 py-4"><span className="text-sm font-semibold">Programming, AI and learning in public</span><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-red-300"><YouTubeLogo className="size-4" /> Watch channel</span></div></SafeLink></div><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="md:col-span-3"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-red-200/60">Video suggestions / topics I love to teach</p></div>{topics.map((topic) => <SafeLink key={topic.number} href={profile.links.youtube} className="youtube-mini youtube-topic group flex-col items-stretch gap-0 p-0"><div className="youtube-topic__art"><YouTubeLogo className="size-8" /><span>{topic.number}</span></div><div className="flex w-full items-start gap-3 p-5"><div className="min-w-0 flex-1"><p className="text-[10px] uppercase tracking-[.15em] text-red-300/75">Suggested topic</p><h3 className="mt-2 text-base font-semibold leading-snug text-white">{topic.title}</h3><p className="mt-2 text-xs leading-5 text-white/55">{topic.detail}</p></div><ArrowUpRight className="mt-1 size-4 shrink-0 text-red-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div></SafeLink>)}</div></div></section>
}

export function Portfolio() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [showPortrait, setShowPortrait] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    if (media.matches) {
      setVideoReady(true)
      setShowPortrait(true)
      setShowTitle(true)
    }
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const targets = document.querySelectorAll<HTMLElement>('#about .max-w-2xl, #work article, .youtube-frame, #dsa a, #experience .divide-y > div')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal')
      target.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 90}ms`)
      observer.observe(target)
    })
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const hero = document.querySelector<HTMLElement>('.hero-video')
    const main = document.querySelector<HTMLElement>('main')
    if (!hero) return
    let frame = 0
    const updateParallax = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.16, 110)
        hero.style.setProperty('--hero-parallax-y', `${offset}px`)
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0
        main?.style.setProperty('--scroll-grid-scale', `${0.16 + progress * 0.84}`)
        main?.style.setProperty('--scroll-grid-opacity', `${0.025 + progress * 0.07}`)
      })
    }
    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateParallax)
    }
  }, [reducedMotion])

  function startHeroVideo() {
    const video = videoRef.current
    if (!video || reducedMotion) return
    video.play().then(() => setShowPortrait(false)).catch(() => {
      setVideoReady(true)
      setShowPortrait(true)
      setShowTitle(true)
    })
    window.setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        setVideoReady(true)
        setShowPortrait(true)
        setShowTitle(true)
      }
    }, 5000)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f1f1ee] selection:bg-[#f1f1ee] selection:text-[#080808]">
      <div aria-label="Technology stack" className="fixed inset-y-0 right-2 z-40 hidden w-14 flex-col items-center justify-center gap-3 border-l border-white/10 bg-[#080808]/70 py-8 backdrop-blur-md lg:flex">
        {technologies.map((tech) => <span key={tech} title={tech} className="group grid size-10 shrink-0 place-items-center"><BrandMark slug={technologyIcons[tech]} label={tech} fallback="" className="tech-logo" /></span>)}
      </div>

      <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-white/10">
        <div className="hero-video absolute inset-0">
          <div aria-hidden="true" className="matrix-field pointer-events-none absolute inset-0 z-10" />
          <video ref={videoRef} className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-1000 ${videoReady && !showPortrait && !reducedMotion ? 'opacity-70' : 'opacity-0'}`} muted playsInline preload="none" onCanPlay={() => { setVideoReady(true); setShowPortrait(false) }} onError={() => { setVideoReady(true); setShowPortrait(true); setShowTitle(true) }} onTimeUpdate={(event) => { if (event.currentTarget.currentTime > 1.2) setShowTitle(true) }} onEnded={(event) => { event.currentTarget.pause(); setShowPortrait(true) }}>
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luma-ada29a76-w6dTRiksYzXRgU95lujOjh7EIKyJIz.mp4" type="video/mp4" />
          </video>
          <img src="/images/vardhan-hero.png" alt="Vardhan Kushwaha standing in a black and white portrait" className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-[1800ms] ease-out ${showPortrait || reducedMotion ? 'opacity-75' : 'opacity-0'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-[#080808]/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,transparent_0%,rgba(8,8,8,0.4)_65%,#080808_100%)]" />
        </div>
        <div className="cinematic-frame pointer-events-none absolute inset-5 z-10 border border-white/15 sm:inset-8 lg:inset-12" />
        <div onAnimationEnd={startHeroVideo} className="cinematic-line pointer-events-none absolute left-1/2 top-1/2 z-20 h-px w-0 -translate-x-1/2 bg-white shadow-[0_0_24px_8px_rgba(255,255,255,0.2)]" />
        <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16"><a href="#top" className="font-mono text-xs uppercase tracking-[0.28em]">VK<span className="text-white/30">’29</span></a><div className="hidden gap-8 text-[10px] uppercase tracking-[0.28em] text-white/55 sm:flex"><a href="#work" className="transition hover:text-white">Work</a><a href="#education" className="transition hover:text-white">Education</a><a href="#skills" className="transition hover:text-white">Skills</a><a href="#about" className="transition hover:text-white">About</a><a href="#contact" className="transition hover:text-white">Contact</a></div><span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50"><i className="size-1.5 rounded-full bg-white" /> Open to possibilities</span></nav>
        <div className={`relative z-20 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-8 pb-14 transition-all duration-1000 sm:px-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:px-20 lg:pb-20 ${showTitle || reducedMotion ? 'hero-copy-visible' : 'hero-copy-hidden'}`}><div><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.34em] text-white/45">Computer Science / Software Engineering</p><h1 className="max-w-3xl text-[clamp(4rem,14vw,11rem)] font-semibold leading-[0.78] tracking-[-0.09em]">VARDHAN<span className="blue-violet-accent text-violet-300">.</span></h1></div><div className="max-w-md lg:justify-self-end"><p className="mb-6 text-2xl font-light leading-tight tracking-[-0.04em] text-white/85 sm:text-3xl">{profile.headline}</p><p className="mb-8 max-w-sm text-sm leading-6 text-white/50">{profile.intro}</p><div className="flex flex-wrap gap-3"><a href="#work" className="group flex items-center gap-3 border border-white bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white">Explore my work <ArrowDownRight className="size-4 transition group-hover:rotate-45" /></a><SafeLink href={profile.links.resume} className="flex items-center gap-3 border border-white/25 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-white hover:text-white">Download resume <ArrowUpRight className="size-4" /></SafeLink></div></div></div>
      </section>

      <section aria-label="Profiles and achievements" className="overflow-hidden border-b border-white/10 bg-[#0c0c0c] py-5"><div className="marquee-track flex w-max items-center gap-8 hover:[animation-play-state:paused]">{[...platformItems, ...platformItems].map((item, index) => { const Icon = 'icon' in item ? item.icon : null; return <SafeLink key={`${item.label}-${index}`} href={item.href} className="group flex items-center gap-3 whitespace-nowrap" external={!item.href.startsWith('#')}><span className="grid size-9 place-items-center rounded-full text-violet-300 transition group-hover:bg-blue-400/10">{'logo' in item ? <BrandMark slug={item.logo} label={item.label} fallback={item.mark} /> : Icon ? <Icon className="size-5" aria-hidden="true" /> : item.mark}</span><span className="text-[10px] uppercase tracking-[0.16em] text-white/80 transition group-hover:text-violet-200">{item.label}</span><span className="text-[10px] text-white/30">/ {item.detail}</span><span className="text-blue-400/50">✳</span></SafeLink> })}</div></section>

      <section id="about" className="mx-auto grid max-w-[1440px] gap-16 px-8 py-28 sm:px-12 lg:grid-cols-[0.7fr_1.3fr] lg:px-20 lg:py-40"><div><p className="eyebrow">01 / Profile</p><h2 className="mt-5 max-w-sm text-4xl font-light leading-[0.95] tracking-[-0.06em] sm:text-6xl">Curious by nature.<br /><span className="text-white/35">Precise by practice.</span></h2></div><div className="max-w-2xl"><p className="text-xl leading-relaxed text-white/75 sm:text-2xl">{profile.intro} I have solved 300+ DSA problems and built five full-stack projects, with 260+ GitHub contributions in 2025.</p><div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-violet-300/25 pt-8 sm:grid-cols-3"><div><p className="eyebrow">Currently</p><p className="mt-3 text-sm text-white/70">B.Tech. CSE · 2025–2029</p></div><div><p className="eyebrow">Focus</p><p className="mt-3 text-sm text-white/70">Full-stack · AI / ML</p></div><div><p className="eyebrow">Practice</p><p className="mt-3 text-sm text-white/70">DSA · Open source</p></div></div></div></section>

      <section id="education" className="border-y border-violet-300/15 bg-[#0b0b0b]"><div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-20 lg:py-28"><p className="eyebrow text-violet-200/70">02 / Education</p><h2 className="mt-5 text-4xl font-light tracking-[-0.06em] sm:text-6xl">Learning with purpose<span className="text-violet-300">.</span></h2><div className="mt-10 grid gap-4 lg:grid-cols-3">{education.map((item) => <article key={item.program} className="resume-card flex min-h-48 flex-col justify-between p-6 sm:p-7"><div><div className="flex items-start justify-between gap-4"><h3 className="text-xl font-medium">{item.program}</h3>{item.result && <span className="rounded-full border border-violet-300/25 px-3 py-1 font-mono text-[10px] text-violet-200">{item.result}</span>}</div><p className="mt-5 leading-6 text-white/60">{item.institution}</p></div><p className="mt-7 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-white/40"><span>{item.dates}</span><span>{item.location}</span></p></article>)}</div></div></section>

      <section id="skills" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-20 lg:py-28"><p className="eyebrow text-violet-200/70">03 / Technical skills</p><h2 className="mt-5 text-4xl font-light tracking-[-0.06em] sm:text-6xl">Tools I build with<span className="text-violet-300">.</span></h2><div className="mt-10 grid gap-4 lg:grid-cols-3">{skillGroups.map((group) => <article key={group.category} className="resume-card p-6 sm:p-7"><h3 className="mb-6 text-xs font-semibold uppercase tracking-[.18em] text-white/70">{group.category}</h3><div className="flex flex-wrap gap-2.5">{group.items.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/[0.025] px-3 py-2 text-xs text-white/70"><BrandMark slug={technologyIcons[item]} label={item} fallback={item.slice(0, 1)} className="skill-mark" />{item}</span>)}</div></article>)}</div></section>

      <section id="work" className="border-y border-white/10"><div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-36"><div className="mb-12 flex items-end justify-between gap-6 sm:mb-16"><div><p className="eyebrow">04 / Selected work</p><h2 className="mt-5 text-5xl font-light tracking-[-0.07em] sm:text-7xl">Built with intent<span className="text-white/30">.</span></h2></div><span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:block">05 case studies</span></div><div className="grid gap-px bg-violet-300/20 lg:grid-cols-3">{projects.map((project) => <article key={project.name} className="group violet-glow pattern-card flex min-h-[360px] flex-col justify-between bg-[#080808] border border-violet-300/20 p-6 transition duration-500 hover:bg-[#0d1025] sm:min-h-[390px] sm:p-9"><div><div className="mb-12 flex items-start justify-between sm:mb-16"><span className="font-mono text-xs text-white/35">{project.index}</span>{'href' in project && project.href ? <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}><ArrowUpRight className="size-5 text-violet-300/70 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-200" /></a> : <ArrowUpRight className="size-5 text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />}</div><p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/40">{project.type}</p><h3 className="text-3xl font-light tracking-[-0.05em]">{project.name}</h3><p className="mt-5 max-w-xs text-sm leading-6 text-white/45">{project.description}</p></div><div className="mt-8 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="inline-flex items-center gap-1.5 border border-violet-300/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/55"><BrandMark slug={technologyIcons[item]} label={item} fallback={item.slice(0, 2).toUpperCase()} className="stack-mark" />{item}</span>)}</div></article>)}</div></div></section>

      <YouTubeSection />

      <section id="dsa" className="border-b border-white/10 bg-[#0b0b0b]"><div className="mx-auto max-w-[1440px] px-8 py-24 sm:px-12 lg:px-20 lg:py-32"><div className="flex flex-col gap-8 border-l-2 border-blue-400/70 pl-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-violet-300/80">06 / Coding practice</p><h2 className="mt-5 text-5xl font-bold tracking-[-0.07em] sm:text-7xl">See DSA Grind Live<span className="text-blue-400">.</span></h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/55">Follow the live trail: problems solved, contests entered, systems built, and the ideas turning into code.</p></div><span className="font-mono text-[10px] uppercase tracking-[.2em] text-violet-300">Open links / live profiles</span></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{platformItems.slice(0, 6).map((item) => <SafeLink key={item.label} href={item.href} className="group pattern-card flex min-h-36 flex-col justify-between border border-violet-300/20 bg-[#111] p-5 transition hover:-translate-y-1 hover:border-violet-300/70 hover:bg-[#101024]"><span className="grid size-12 place-items-center rounded-full text-violet-200"><BrandMark slug={item.logo} label={item.label} fallback={item.mark} /></span><span><span className="block text-sm font-bold">{item.label}</span><span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-white/40">{item.detail}</span></span><ArrowUpRight className="size-4 text-violet-300/70 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></SafeLink>)}</div></div></section>

      <ExperienceSection />

      <AchievementsSection />

      <section id="contact" className="border-t border-white/10 bg-[#f1f1ee] text-[#080808]"><div className="mx-auto max-w-[1440px] px-8 py-24 sm:px-12 lg:px-20 lg:py-36"><p className="eyebrow text-black/45">09 / Contact</p><div className="mt-8 flex flex-col justify-between gap-12 lg:flex-row lg:items-end"><h2 className="max-w-3xl text-5xl font-light leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-8xl">Have an interesting problem?<br /><span className="text-black/35">Let&apos;s build something meaningful.</span></h2><div className="flex shrink-0 flex-wrap gap-5"><span className="self-center text-[10px] uppercase tracking-[.16em] text-black/45">{profile.location}</span><a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="border-b border-blue-400/30 pb-2 text-[10px] uppercase tracking-[0.2em] transition hover:border-violet-600">{profile.phone}</a><SafeLink href={profile.links.linkedin} className="border-b border-black/30 pb-2 text-[10px] uppercase tracking-[0.2em] transition hover:border-black">LinkedIn</SafeLink><SafeLink href={profile.links.youtube} className="border-b border-black/30 pb-2 text-[10px] uppercase tracking-[0.2em] transition hover:border-black">YouTube</SafeLink><SafeLink href={profile.links.email} className="border-b border-black/30 pb-2 text-[10px] uppercase tracking-[0.2em] transition hover:border-black">{profile.email}</SafeLink></div></div></div><footer className="border-t border-black/15 px-8 py-6 sm:px-12 lg:px-20"><div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.18em] text-black/45 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Vardhan Kushwaha</span><span>Designed & engineered with intention</span><a href="#top" className="flex items-center gap-2 transition hover:text-black">Back to top <ArrowUpRight className="size-3" /></a></div></footer></section>
      <PortfolioChat />
    </main>
  )
}

"use client"
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUiState } from '@/components/UiStateProvider'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState('')
  const { toggleSidebar } = useUiState()

  useEffect(() => {
    const qp = params.get('q') ?? ''
    setQ(qp)
  }, [params])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const url = q ? `/?q=${encodeURIComponent(q)}` : '/'
    router.push(url)
  }

  return (
    <header className="fixed top-0 inset-x-0 h-[var(--header-height)] border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur z-50">
      <div className="container-page h-full flex items-center gap-4">
        <button
          className="md:hidden rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-600"><path d="M10 15l5.19-3L10 9v6z"></path><path d="M21.58 7.19c-.2-.75-.79-1.34-1.54-1.54C18.54 5 12 5 12 5s-6.54 0-8.04.65c-.75.2-1.34.79-1.54 1.54C2 8.69 2 12 2 12s0 3.31.42 4.81c.2.75.79 1.34 1.54 1.54C5.46 19 12 19 12 19s6.54 0 8.04-.65c.75-.2 1.34-.79 1.54-1.54C22 15.31 22 12 22 12s0-3.31-.42-4.81z"></path></svg>
          <span className="text-lg">YouTube Clone</span>
        </Link>

		{/* Top-level nav removed; use sidebar for navigation */}

        <form onSubmit={onSubmit} className="flex-1 flex items-center max-w-3xl mx-auto">
          <div className="flex w-full rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
            <input
              className="w-full px-4 py-2 bg-transparent focus:outline-none"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search videos"
            />
            <button type="submit" className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800">🔍</button>
          </div>
        </form>

        <button
          aria-label="Toggle dark mode"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}



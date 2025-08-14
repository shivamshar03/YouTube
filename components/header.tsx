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
      <div className="container-page h-full flex items-center gap-2 sm:gap-4">
        <button
          className="md:hidden rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
            <rect x="0" y="0" width="28" height="20" rx="4" fill="#FF0000" />
            <polygon points="11,6 11,14 18,10" fill="#FFFFFF" />
          </svg>
          <span className="text-lg hidden sm:inline">YouTube</span>
        </Link>

		{/* Top-level nav removed; use sidebar for navigation */}

        <form onSubmit={onSubmit} className="min-w-0 flex-1 flex items-center max-w-full lg:max-w-5xl mx-auto">
          <div className="flex w-full rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
            <input
              className="w-full px-3 sm:px-4 py-2 bg-transparent focus:outline-none"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search videos"
            />
            <button type="submit" className="px-3 sm:px-4 py-2 bg-neutral-100 dark:bg-neutral-800">🔍</button>
          </div>
        </form>

        <button
          aria-label="Toggle dark mode"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="hidden sm:inline-flex rounded-md border border-neutral-300 dark:border-neutral-700 px-2 sm:px-3 py-2"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}



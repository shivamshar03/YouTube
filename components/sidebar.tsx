"use client"
import Link from 'next/link'
import { useUiState } from '@/components/UiStateProvider'

const links = [
  { href: '/', label: 'Home' },
  { href: '/trending', label: 'Trending' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/history', label: 'History' },
  { href: '/watch-later', label: 'Watch later' },
  { href: '/categories', label: 'Categories' },
  { href: '/(secondary)/playlist', label: 'Playlist' },
  { href: '/library', label: 'Library' },
  { href: '/settings', label: 'Settings' },
]

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiState()
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed top-[var(--header-height)] left-0 bottom-0 w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <nav className="p-3 space-y-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              onClick={() => setSidebarOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}



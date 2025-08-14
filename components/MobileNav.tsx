"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', label: 'Home', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7"/><path d="M9 22V12h6v10"/></svg>
  )},
  { href: '/trending', label: 'Trending', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.88-3.36L23 10"/><path d="M1 14l4.51 4.49A9 9 0 0 0 20.49 15"/></svg>
  )},
  { href: '/(secondary)/subscriptions', label: 'Subs', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><path d="M17 2l4 4"/><path d="M8 12l6 3-6 3z"/></svg>
  )},
  { href: '/library', label: 'Library', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4v16"/><rect x="8" y="2" width="12" height="20" rx="2"/></svg>
  )},
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-14 border-t border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur z-50">
      <div className="container-page h-full grid grid-cols-4">
        {items.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center text-xs">
              <span className={active ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}>{item.icon}</span>
              <span className={active ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}



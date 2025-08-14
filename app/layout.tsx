import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/header'
import { UiStateProvider } from '@/components/UiStateProvider'
import Sidebar from '@/components/sidebar'
import { ClientDataProvider } from '@/components/ClientDataProvider'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouTube Clone - Next.js',
  description: 'A modern YouTube-like video app built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UiStateProvider>
            <ClientDataProvider>
              <Suspense fallback={null}>
                <Header />
              </Suspense>
              <Sidebar />
              <main className="pt-[var(--header-height)] min-h-screen container-page md:pl-64 pb-16 md:pb-0">{children}</main>
              <DynamicMobileNav />
            </ClientDataProvider>
          </UiStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

const DynamicMobileNav = dynamic(() => import('@/components/MobileNav'), { ssr: false })



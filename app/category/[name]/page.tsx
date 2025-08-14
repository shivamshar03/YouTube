import { searchVideos } from '@/lib/videos'
import VideoGrid from '@/components/VideoGrid'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 0

export default function CategoryPage({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name)
  if (!name) return notFound()
  const result = searchVideos({ category: name, sort: 'popular', page: 1, limit: 32 })
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Category: {name}</h1>
        <div className="flex gap-2 text-sm">
          <Link href="/category/Trending" className="px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700">Trending</Link>
          <Link href="/category/Recommended" className="px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700">Recommended</Link>
          <Link href="/category/Education" className="px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700">Education</Link>
          <Link href="/category/Animation" className="px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700">Animation</Link>
        </div>
      </div>
      <VideoGrid videos={result.items} />
    </div>
  )
}



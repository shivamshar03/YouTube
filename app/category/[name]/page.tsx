import { searchVideos } from '@/lib/videos'
import VideoGrid from '@/components/VideoGrid'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

export const revalidate = 0

export default function CategoryPage({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name)
  if (!name) return notFound()
  const result = searchVideos({ category: name, sort: 'popular', page: 1, limit: 32 })
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Category: {name}</h1>
        <div className="flex gap-2 text-sm overflow-x-auto no-scrollbar">
          {['Trending','Entertainment','Gaming','Information','Music','Sports','News','Live','Education','Animation'].map(c => (
            <Link key={c} href={`/category/${encodeURIComponent(c)}`} className="px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 whitespace-nowrap">{c}</Link>
          ))}
        </div>
      </div>
      <VideoGrid videos={result.items} />
      <InfiniteCategory c={name} />
    </div>
  )
}

const InfiniteCategory = dynamic(() => import('@/components/InfiniteYouTubeCategory'), { ssr: false })



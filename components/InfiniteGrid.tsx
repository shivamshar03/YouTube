"use client"
import useSWRInfinite from 'swr/infinite'
import VideoGrid from '@/components/VideoGrid'
import type { PaginatedResult, VideoItem } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function InfiniteGrid({ q, c }: { q?: string; c?: string }) {
  const getKey = (pageIndex: number, previous: PaginatedResult<VideoItem> | null) => {
    if (previous && previous.nextPage === null) return null
    const page = previous ? previous.nextPage : 1
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (c) params.set('c', c)
    params.set('page', String(page))
    params.set('limit', '16')
    params.set('sort', 'trending')
    return `/api/videos?${params.toString()}`
  }

  const { data, size, setSize, isValidating } = useSWRInfinite<PaginatedResult<VideoItem>>(getKey, fetcher)
  const items = data ? data.flatMap(d => d.items) : []
  const hasMore = data ? data[data.length - 1]?.nextPage !== null : true

  return (
    <div className="space-y-6">
      <VideoGrid videos={items} />
      <div className="flex justify-center py-4">
        {hasMore ? (
          <button
            className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700"
            onClick={() => setSize(size + 1)}
            disabled={isValidating}
          >
            {isValidating ? 'Loading…' : 'Load more'}
          </button>
        ) : (
          <span className="text-sm text-neutral-500">No more videos</span>
        )}
      </div>
    </div>
  )
}



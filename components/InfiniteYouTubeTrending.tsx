"use client"
import useSWRInfinite from 'swr/infinite'
import VideoGrid from '@/components/VideoGrid'
import type { VideoItem } from '@/lib/types'

type Paged = { items: VideoItem[]; nextPageToken: string | null }
const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function InfiniteYouTubeTrending() {
  const getKey = (pageIndex: number, previous: Paged | null) => {
    if (previous && previous.nextPageToken === null) return null
    const params = new URLSearchParams()
    if (previous && previous.nextPageToken) params.set('pageToken', previous.nextPageToken)
    return `/api/youtube/trending-paged?${params.toString()}`
  }
  const { data, size, setSize, isValidating } = useSWRInfinite<Paged>(getKey, fetcher)
  const items = data ? data.flatMap(d => d.items) : []
  const hasMore = data ? data[data.length - 1]?.nextPageToken !== null : true

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
          <span className="text-sm text-neutral-500">No more results</span>
        )}
      </div>
    </div>
  )
}



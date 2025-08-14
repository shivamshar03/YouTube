import videos from '@/data/videos.json'
import type { PaginatedResult, VideoItem } from '@/lib/types'

const PAGE_SIZE_DEFAULT = 12

export function getAllVideos(): VideoItem[] {
  return videos as unknown as VideoItem[]
}

export function getVideoById(id: string): VideoItem | undefined {
  return getAllVideos().find(v => v.id === id)
}

export function searchVideos({
  query,
  category,
  sort,
  page = 1,
  limit = PAGE_SIZE_DEFAULT,
}: {
  query?: string
  category?: string
  sort?: 'trending' | 'recent' | 'popular'
  page?: number
  limit?: number
}): PaginatedResult<VideoItem> {
  const q = (query ?? '').toLowerCase().trim()

  let items = getAllVideos().filter(v => {
    const matchQ = q
      ? v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.channelName.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
      : true
    const matchC = category ? v.categories.includes(category) : true
    return matchQ && matchC
  })

  if (sort === 'recent') {
    items = items.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  } else if (sort === 'popular') {
    items = items.sort((a, b) => b.views - a.views)
  } else if (sort === 'trending') {
    items = items.sort((a, b) => b.likes / Math.max(1, b.views) - a.likes / Math.max(1, a.views))
  }

  const total = items.length
  const start = (page - 1) * limit
  const end = start + limit
  const pageItems = items.slice(start, end)

  return {
    items: pageItems,
    nextPage: end < total ? page + 1 : null,
    total,
  }
}



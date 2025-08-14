export type VideoSource = 'youtube' | 'mp4'

export interface VideoItem {
  id: string
  source: VideoSource
  youtubeId: string | null
  mp4Url: string | null
  title: string
  description: string
  channelId: string
  channelName: string
  channelAvatar: string
  thumbnail: string
  duration: number
  views: number
  likes: number
  publishedAt: string
  categories: string[]
  tags: string[]
}

export interface PaginatedResult<T> {
  items: T[]
  nextPage: number | null
  total: number
}



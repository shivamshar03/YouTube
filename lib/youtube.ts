import { getYouTubeApiKey } from '@/lib/env'
import type { VideoItem } from '@/lib/types'

const YT_API = 'https://www.googleapis.com/youtube/v3'

function detectCategoriesFromSnippet(snippet: any): string[] {
  const text = (
    (snippet?.title || '') + ' ' +
    (snippet?.description || '') + ' ' +
    ((snippet?.tags || []) as string[]).join(' ')
  ).toLowerCase()

  const categories: string[] = []
  const pushIf = (cond: boolean, label: string) => { if (cond && !categories.includes(label)) categories.push(label) }

  pushIf(/game|gaming|xbox|playstation|ps[0-9]|nintendo|minecraft|fortnite|roblox|valorant|call of duty/.test(text), 'Gaming')
  pushIf(/music|song|album|track|official video|lyrics|live performance/.test(text), 'Music')
  pushIf(/news|breaking|headline|report|journal|politic|election/.test(text), 'News')
  pushIf(/sport|match|league|highlights|football|soccer|nba|cricket|tennis|fifa|ufc/.test(text), 'Sports')
  pushIf(/movie|film|trailer|comedy|funny|show|series|entertainment/.test(text), 'Entertainment')
  pushIf(/how to|tutorial|guide|course|learn|tips|trick|explained|information|info|documentary/.test(text), 'Information')
  pushIf(/live|stream|premiere/.test(text), 'Live')
  pushIf(/tech|gadget|iphone|android|review|unboxing|programming|coding|developer|next\.js|react/.test(text), 'Education')

  if (categories.length === 0) categories.push('Trending')
  return categories
}

function mapYouTubeItemToVideo(item: any): VideoItem | null {
  const id = item.id?.videoId || item.id
  const snippet = item.snippet
  const stats = item.statistics
  if (!id || !snippet) return null
  return {
    id: `yt_${id}`,
    source: 'youtube',
    youtubeId: id,
    mp4Url: null,
    title: snippet.title || 'Untitled',
    description: snippet.description || '',
    channelId: snippet.channelId || 'unknown',
    channelName: snippet.channelTitle || 'YouTube Channel',
    channelAvatar: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
      snippet.channelTitle || 'YT',
    )}`,
    thumbnail:
      snippet.thumbnails?.maxres?.url ||
      snippet.thumbnails?.high?.url ||
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.default?.url ||
      '',
    duration: 0,
    views: Number(stats?.viewCount || 0),
    likes: Number(stats?.likeCount || 0),
    publishedAt: snippet.publishedAt || new Date().toISOString(),
    categories: detectCategoriesFromSnippet(snippet),
    tags: snippet.tags || [],
  }
}

export async function fetchTrending(): Promise<VideoItem[]> {
  const key = getYouTubeApiKey()
  if (!key) return []
  // Use videos.list with chart=mostPopular for trending
  const params = new URLSearchParams({
    part: 'snippet,statistics',
    chart: 'mostPopular',
    maxResults: '25',
    regionCode: 'US',
    key,
  })
  const res = await fetch(`${YT_API}/videos?${params.toString()}`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const json = await res.json()
  return (json.items || [])
    .map(mapYouTubeItemToVideo)
    .filter(Boolean) as VideoItem[]
}

export async function searchYouTube(query: string): Promise<VideoItem[]> {
  const key = getYouTubeApiKey()
  if (!key) return []
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    maxResults: '25',
    type: 'video',
    key,
  })
  const res = await fetch(`${YT_API}/search?${params.toString()}`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const json = await res.json()

  // We need statistics (views/likes) via videos.list; batch fetch
  const ids = (json.items || []).map((i: any) => i.id?.videoId).filter(Boolean)
  if (ids.length === 0) return []
  const statsParams = new URLSearchParams({
    part: 'snippet,statistics',
    id: ids.join(','),
    key,
  })
  const statsRes = await fetch(`${YT_API}/videos?${statsParams.toString()}`, { next: { revalidate: 60 } })
  if (!statsRes.ok) return []
  const statsJson = await statsRes.json()

  return (statsJson.items || [])
    .map(mapYouTubeItemToVideo)
    .filter(Boolean) as VideoItem[]
}

export async function fetchVideoById(youtubeId: string): Promise<VideoItem | null> {
  const key = getYouTubeApiKey()
  if (!key) return null
  const params = new URLSearchParams({
    part: 'snippet,statistics',
    id: youtubeId,
    key,
  })
  const res = await fetch(`${YT_API}/videos?${params.toString()}`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  const json = await res.json()
  const item = (json.items || [])[0]
  if (!item) return null
  return mapYouTubeItemToVideo(item)
}

export async function searchYouTubePaged(query: string, pageToken?: string): Promise<{ items: VideoItem[]; nextPageToken: string | null }> {
  const key = getYouTubeApiKey()
  if (!key) return { items: [], nextPageToken: null }
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    maxResults: '25',
    type: 'video',
    key,
  })
  if (pageToken) params.set('pageToken', pageToken)
  const res = await fetch(`${YT_API}/search?${params.toString()}`, { next: { revalidate: 30 } })
  if (!res.ok) return { items: [], nextPageToken: null }
  const json = await res.json()
  const ids = (json.items || []).map((i: any) => i.id?.videoId).filter(Boolean)
  if (ids.length === 0) return { items: [], nextPageToken: null }
  const statsParams = new URLSearchParams({
    part: 'snippet,statistics',
    id: ids.join(','),
    key,
  })
  const statsRes = await fetch(`${YT_API}/videos?${statsParams.toString()}`, { next: { revalidate: 30 } })
  if (!statsRes.ok) return { items: [], nextPageToken: null }
  const statsJson = await statsRes.json()
  return {
    items: (statsJson.items || []).map(mapYouTubeItemToVideo).filter(Boolean) as VideoItem[],
    nextPageToken: json.nextPageToken || null,
  }
}

export async function fetchTrendingPaged(pageToken?: string): Promise<{ items: VideoItem[]; nextPageToken: string | null }> {
  const key = getYouTubeApiKey()
  if (!key) return { items: [], nextPageToken: null }
  const params = new URLSearchParams({
    part: 'snippet,statistics',
    chart: 'mostPopular',
    maxResults: '25',
    regionCode: 'US',
    key,
  })
  if (pageToken) params.set('pageToken', pageToken)
  const res = await fetch(`${YT_API}/videos?${params.toString()}`, { next: { revalidate: 30 } })
  if (!res.ok) return { items: [], nextPageToken: null }
  const json = await res.json()
  return {
    items: (json.items || []).map(mapYouTubeItemToVideo).filter(Boolean) as VideoItem[],
    nextPageToken: json.nextPageToken || null,
  }
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Trending: ['trending'],
  Gaming: ['gaming', 'game', 'playthrough', 'xbox', 'ps5', 'nintendo'],
  Music: ['music', 'official video', 'lyrics', 'song'],
  Entertainment: ['entertainment', 'funny', 'comedy', 'movie', 'trailer', 'show'],
  Information: ['documentary', 'explained', 'how to', 'information', 'guide'],
  Sports: ['sports', 'match', 'highlights', 'football', 'soccer', 'nba', 'cricket'],
  News: ['news', 'breaking', 'report'],
  Live: ['live'],
  Education: ['tutorial', 'course', 'learn', 'programming', 'coding', 'react', 'next.js'],
}

export async function searchYouTubeByCategoryPaged(category: string, pageToken?: string): Promise<{ items: VideoItem[]; nextPageToken: string | null }> {
  const key = getYouTubeApiKey()
  if (!key) return { items: [], nextPageToken: null }
  const keywords = CATEGORY_KEYWORDS[category] || [category]
  const q = keywords.join(' | ')
  return searchYouTubePaged(q, pageToken)
}



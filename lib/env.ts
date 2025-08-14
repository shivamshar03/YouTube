export function getYouTubeApiKey(): string | null {
  const key = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''
  return key ? key : null
}



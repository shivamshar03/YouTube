import { NextRequest } from 'next/server'
import { searchYouTubePaged } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const pageToken = searchParams.get('pageToken') || undefined
  if (!q) return new Response('Missing q', { status: 400 })
  const result = await searchYouTubePaged(q, pageToken)
  return Response.json(result, { headers: { 'cache-control': 'public, max-age=30' } })
}



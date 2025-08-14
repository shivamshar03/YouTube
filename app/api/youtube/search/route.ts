import { NextRequest } from 'next/server'
import { searchYouTube } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  if (!q) return new Response('Missing q', { status: 400 })
  const items = await searchYouTube(q)
  return Response.json({ items }, { headers: { 'cache-control': 'public, max-age=60' } })
}



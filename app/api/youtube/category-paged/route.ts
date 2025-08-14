import { NextRequest } from 'next/server'
import { searchYouTubeByCategoryPaged } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const c = searchParams.get('c') || ''
  const pageToken = searchParams.get('pageToken') || undefined
  if (!c) return new Response('Missing c', { status: 400 })
  const result = await searchYouTubeByCategoryPaged(c, pageToken)
  return Response.json(result, { headers: { 'cache-control': 'public, max-age=30' } })
}



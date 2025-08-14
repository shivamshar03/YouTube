import { NextRequest } from 'next/server'
import { fetchTrendingPaged } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pageToken = searchParams.get('pageToken') || undefined
  const result = await fetchTrendingPaged(pageToken)
  return Response.json(result, { headers: { 'cache-control': 'public, max-age=30' } })
}



import { NextRequest } from 'next/server'
import { searchVideos } from '@/lib/videos'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || undefined
  const c = searchParams.get('c') || undefined
  const page = parseInt(searchParams.get('page') || '1', 10) || 1
  const limit = parseInt(searchParams.get('limit') || '16', 10) || 16
  const sort = (searchParams.get('sort') as any) || 'trending'

  const result = searchVideos({ query: q, category: c || undefined, page, limit, sort })
  return Response.json(result, { headers: { 'cache-control': 'no-store' } })
}



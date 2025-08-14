import { NextRequest } from 'next/server'
import { fetchVideoById } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') || ''
  if (!id) return new Response('Missing id', { status: 400 })
  const item = await fetchVideoById(id)
  if (!item) return new Response('Not found', { status: 404 })
  return Response.json(item, { headers: { 'cache-control': 'public, max-age=60' } })
}



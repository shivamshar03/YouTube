import { NextRequest } from 'next/server'
import { getVideoById } from '@/lib/videos'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return new Response('Missing id', { status: 400 })

  const video = getVideoById(id)
  if (!video) return new Response('Not found', { status: 404 })

  // Only allow direct MP4 sources for downloading.
  if (video.source !== 'mp4' || !video.mp4Url) {
    return new Response('Download not available for this source', { status: 400 })
  }

  const upstream = await fetch(video.mp4Url)
  if (!upstream.ok || !upstream.body) {
    return new Response('Upstream error', { status: 502 })
  }

  const headers = new Headers()
  headers.set('content-type', upstream.headers.get('content-type') || 'video/mp4')
  headers.set('content-disposition', `attachment; filename="${id}.mp4"`)
  headers.set('cache-control', 'no-store')

  return new Response(upstream.body, {
    status: 200,
    headers,
  })
}



import { NextRequest } from 'next/server'

// Simple proxy streamer for open MP4 sources to avoid client-side CORS and provide a stable URL.
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const src = url.searchParams.get('url')
  if (!src) {
    return new Response('Missing url', { status: 400 })
  }

  try {
    const upstream = await fetch(src, {
      headers: {
        // Forward range requests for seeking
        Range: req.headers.get('range') || '',
      },
    })

    const headers = new Headers()
    // Copy content-type and length and range headers
    const copy = ['content-type', 'content-length', 'accept-ranges', 'content-range']
    copy.forEach((h) => {
      const v = upstream.headers.get(h)
      if (v) headers.set(h, v)
    })
    headers.set('cache-control', 'no-store')

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    })
  } catch (e) {
    return new Response('Failed to stream', { status: 500 })
  }
}



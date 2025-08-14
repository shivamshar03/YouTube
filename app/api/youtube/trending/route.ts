import { fetchTrending } from '@/lib/youtube'

export async function GET() {
  const items = await fetchTrending()
  return Response.json({ items }, { headers: { 'cache-control': 'public, max-age=60' } })
}



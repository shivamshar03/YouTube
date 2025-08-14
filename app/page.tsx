import { searchVideos } from '@/lib/videos'
import VideoGrid from '@/components/VideoGrid'
import NextDynamic from 'next/dynamic'
import Link from 'next/link'
import ChipsBar from '@/components/ChipsBar'
import { fetchTrending, searchYouTube } from '@/lib/youtube'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const q = typeof searchParams?.q === 'string' ? searchParams?.q : undefined
  const category = typeof searchParams?.c === 'string' ? searchParams?.c : undefined
  const local = searchVideos({ query: q, category, sort: 'trending', page: 1, limit: 16 })
  const ytResults = q ? await searchYouTube(q) : []
  const ytTrending = !q ? await fetchTrending() : []

  const categories = ['All', 'Trending', 'Recommended', 'Animation', 'Education', 'Sci-Fi', 'Trailers']

  return (
    <div className="space-y-8 py-6">
      <ChipsBar items={categories} active={category} baseHref="/" param="c" />

      {q ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search results for "{q}" (YouTube)</h2>
          {ytResults.length ? <VideoGrid videos={ytResults} /> : <VideoGrid videos={local.items} />}
          {ytResults.length ? <DynamicInfiniteYouTube q={q} /> : null}
        </div>
      ) : (
        <>
          {ytTrending.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">Trending now</h2>
                <Link className="text-sm text-brand-600" href="/trending">See all</Link>
              </div>
              <VideoGrid videos={ytTrending.slice(0, 12)} />
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommended</h2>
            <VideoGrid videos={local.items} />
            {local.nextPage && <DynamicInfinite q={q} c={category} />}
          </div>
        </>
      )}
    </div>
  )
}

const DynamicInfiniteYouTube = NextDynamic(() => import('@/components/InfiniteYouTube'), { ssr: false })

const DynamicInfinite = NextDynamic(() => import('@/components/InfiniteGrid'), { ssr: false })



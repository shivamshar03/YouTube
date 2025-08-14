import dynamic from 'next/dynamic'

export const revalidate = 0

export default function TrendingPage() {
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Trending</h1>
      <InfiniteTrendingClient />
    </div>
  )
}

const InfiniteTrendingClient = dynamic(() => import('@/components/InfiniteYouTubeTrending'), { ssr: false })



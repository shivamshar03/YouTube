import { getVideoById, searchVideos } from '@/lib/videos'
import { fetchVideoById } from '@/lib/youtube'
import Player from '@/components/Player'
import VideoGrid from '@/components/VideoGrid'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import VideoActions from '@/components/VideoActions'

export default async function WatchPage({ params }: { params: { id: string } }) {
  let video = getVideoById(params.id)
  if (!video && params.id.startsWith('yt_')) {
    const ytId = params.id.replace(/^yt_/, '')
    video = (await fetchVideoById(ytId)) || undefined
  }
  if (!video) return notFound()

  const related = searchVideos({ query: video.tags[0], limit: 8, sort: 'popular' }).items.filter(v => v.id !== video.id)

  return (
    <div className="py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <Player video={video} />
        <h1 className="text-2xl font-semibold">{video.title}</h1>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="mr-auto">
            <div className="font-medium">{video.channelName}</div>
          </div>
          <VideoActions id={video.id} />
          <a
            href={`/api/download?id=${encodeURIComponent(video.id)}`}
            className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700"
          >
            Download Video
          </a>
        </div>
        <div className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap border rounded-md p-4 border-neutral-200 dark:border-neutral-800">
          {video.description}
        </div>
      </div>
      <div className="lg:col-span-1 space-y-3">
        <h2 className="font-semibold">Related</h2>
        <VideoGrid videos={related} />
      </div>
    </div>
  )
}



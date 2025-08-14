import type { VideoItem } from '@/lib/types'
import VideoCard from '@/components/VideoCard'

export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}



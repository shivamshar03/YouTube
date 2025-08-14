import Link from 'next/link'
import Image from 'next/image'
import type { VideoItem } from '@/lib/types'
import VideoActions from '@/components/VideoActions'

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n}`
}

function timeSince(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ]
  for (const [s, label] of intervals) {
    const c = Math.floor(seconds / s)
    if (c >= 1) return `${c} ${label}${c > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link href={`/watch/${video.id}`} className="block group">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="mt-3 flex gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700">
          {/* Use Next Image for remote avatars, fallback to initials service */}
          <Image
            src={video.channelAvatar || `https://ui-avatars.com/api/?background=999&color=fff&name=${encodeURIComponent(video.channelName)}`}
            alt={video.channelName}
            fill
            sizes="36px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-neutral-900 dark:group-hover:text-white">{video.title}</h3>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <div className="truncate">{video.channelName}</div>
            <div className="truncate">{formatViews(video.views)} views • {timeSince(video.publishedAt)}</div>
          </div>
        </div>
        <div className="self-start">
          <VideoActions id={video.id} />
        </div>
      </div>
    </Link>
  )
}



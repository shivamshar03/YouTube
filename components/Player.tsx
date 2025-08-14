"use client"
import type { VideoItem } from '@/lib/types'

export default function Player({ video }: { video: VideoItem }) {
  if (video.source === 'mp4' && video.mp4Url) {
    return (
      <video
        controls
        className="w-full aspect-video rounded-xl bg-black"
        src={`/api/stream?url=${encodeURIComponent(video.mp4Url)}&id=${encodeURIComponent(video.id)}`}
      />
    )
  }

  if (video.source === 'youtube' && video.youtubeId) {
    const params = new URLSearchParams({
      modestbranding: '1',
      rel: '0',
      iv_load_policy: '3',
      autoplay: '0',
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    } as any)
    const src = `https://www.youtube.com/embed/${video.youtubeId}?${params.toString()}`
    return (
      <iframe
        className="w-full aspect-video rounded-xl overflow-hidden bg-black"
        src={src}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return <div className="w-full aspect-video rounded-xl overflow-hidden bg-black" />
}



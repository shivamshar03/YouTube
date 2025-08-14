"use client"
import { useEffect, useRef } from 'react'
import type { VideoItem } from '@/lib/types'

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export default function Player({ video }: { video: VideoItem }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (video.source === 'mp4') return

    if (window.YT && window.YT.Player) {
      create()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      window.onYouTubeIframeAPIReady = () => {
        create()
      }
      document.body.appendChild(tag)
    }

    function create() {
      if (!ref.current || !video.youtubeId) return
      // eslint-disable-next-line no-new
      new window.YT.Player(ref.current, {
        height: '390',
        width: '640',
        videoId: video.youtubeId,
        playerVars: {
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          autoplay: 0,
        },
        events: {},
      })
    }
  }, [video])

  if (video.source === 'mp4' && video.mp4Url) {
    return (
      <video
        controls
        className="w-full aspect-video rounded-xl bg-black"
        src={`/api/stream?url=${encodeURIComponent(video.mp4Url)}&id=${encodeURIComponent(video.id)}`}
      />
    )
  }

  return <div ref={ref} className="w-full aspect-video rounded-xl overflow-hidden bg-black" />
}



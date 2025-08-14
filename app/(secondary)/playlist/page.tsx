"use client"
import { useClientData } from '@/components/ClientDataProvider'
import { getAllVideos } from '@/lib/videos'
import VideoGrid from '@/components/VideoGrid'
import { useMemo } from 'react'

export const dynamic = 'force-dynamic'
export default function PlaylistPage() {
  const { playlist } = useClientData()
  const all = getAllVideos()
  // Note: YouTube-only IDs may not be in local data; we render only known local items here.
  const items = useMemo(() => all.filter(v => playlist.includes(v.id)), [all, playlist])
  return (
    <div className="py-6 space-y-4">
      <h1 className="text-2xl font-semibold">My Playlist</h1>
      {items.length ? <VideoGrid videos={items} /> : <p className="text-neutral-600 dark:text-neutral-400">No videos yet.</p>}
    </div>
  )
}



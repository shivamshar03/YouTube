"use client"
import { useClientData } from '@/components/ClientDataProvider'

export default function VideoActions({ id }: { id: string }) {
  const { likes, toggleLike, isInPlaylist, addToPlaylist, removeFromPlaylist } = useClientData()
  const liked = likes.has(id)
  const inPlaylist = isInPlaylist(id)
  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleLike(id)
        }}
        className={`px-3 py-1.5 rounded-full border text-sm ${liked ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700'}`}
      >
        {liked ? 'Liked' : 'Like'}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          inPlaylist ? removeFromPlaylist(id) : addToPlaylist(id)
        }}
        className={`px-3 py-1.5 rounded-full border text-sm ${inPlaylist ? 'bg-brand-600 text-white' : 'border-neutral-300 dark:border-neutral-700'}`}
      >
        {inPlaylist ? 'In playlist' : 'Add to playlist'}
      </button>
    </div>
  )
}



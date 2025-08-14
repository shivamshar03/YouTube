"use client"
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { VideoItem } from '@/lib/types'

type ClientDataContextType = {
  likes: Set<string>
  toggleLike: (id: string) => void
  playlist: string[]
  isInPlaylist: (id: string) => boolean
  addToPlaylist: (id: string) => void
  removeFromPlaylist: (id: string) => void
}

const ClientDataContext = createContext<ClientDataContextType | null>(null)

const LIKES_KEY = 'ytc_likes'
const PLAYLIST_KEY = 'ytc_playlist_default'

export function ClientDataProvider({ children }: { children: React.ReactNode }) {
  const [likes, setLikes] = useState<Set<string>>(new Set())
  const [playlist, setPlaylist] = useState<string[]>([])

  useEffect(() => {
    try {
      const l = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]') as string[]
      setLikes(new Set(l))
      const p = JSON.parse(localStorage.getItem(PLAYLIST_KEY) || '[]') as string[]
      setPlaylist(p)
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(LIKES_KEY, JSON.stringify(Array.from(likes)))
  }, [likes])

  useEffect(() => {
    localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlist))
  }, [playlist])

  const toggleLike = (id: string) => {
    setLikes(prev => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  const isInPlaylist = (id: string) => playlist.includes(id)
  const addToPlaylist = (id: string) => setPlaylist(prev => (prev.includes(id) ? prev : [...prev, id]))
  const removeFromPlaylist = (id: string) => setPlaylist(prev => prev.filter(v => v !== id))

  const value = useMemo<ClientDataContextType>(
    () => ({ likes, toggleLike, playlist, isInPlaylist, addToPlaylist, removeFromPlaylist }),
    [likes, playlist],
  )

  return <ClientDataContext.Provider value={value}>{children}</ClientDataContext.Provider>
}

export function useClientData() {
  const ctx = useContext(ClientDataContext)
  if (!ctx) throw new Error('useClientData must be used within ClientDataProvider')
  return ctx
}



"use client"
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface UiState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const Ctx = createContext<UiState | null>(null)

export function UiStateProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])
  const value = useMemo(() => ({ sidebarOpen, setSidebarOpen, toggleSidebar }), [sidebarOpen, toggleSidebar])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useUiState(): UiState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useUiState must be used within UiStateProvider')
  return ctx
}



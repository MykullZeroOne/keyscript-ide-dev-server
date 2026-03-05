import { create } from 'zustand'

interface LoginState {
  isLoggedIn: boolean
  username: string | null
  instance: string
  showLoginDialog: boolean
  
  setLoggedIn: (isLoggedIn: boolean, username?: string | null) => void
  setInstance: (instance: string) => void
  setShowLoginDialog: (show: boolean) => void
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoggedIn: false,
  username: null,
  instance: 'Test',
  showLoginDialog: true, // Show by default if not logged in
  
  setLoggedIn: (isLoggedIn, username = null) => set({ isLoggedIn, username, showLoginDialog: !isLoggedIn }),
  setInstance: (instance) => set({ instance }),
  setShowLoginDialog: (show) => set({ showLoginDialog: show })
}))

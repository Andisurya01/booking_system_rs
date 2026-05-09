import { User } from '@/modules/auth/types/authTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: number
  uuid: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  setAuth: (user: User, isAunthenticated: boolean) => void
  isAuthenticated: boolean
  logout: () => void
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }), 
    { name: 'auth-storage' }
  )
)

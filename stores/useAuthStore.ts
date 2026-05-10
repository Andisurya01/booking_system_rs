import { User } from '@/modules/auth/types/authTypes'
import { Patient } from '@/types/patient'
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
  patient: Patient | null
  setAuth: (user: User, isAunthenticated: boolean) => void
  setPatient: (patient: Patient) => void
  isAuthenticated: boolean
  logout: () => void
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      patient: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      setPatient: (patient) => set({ patient }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
)

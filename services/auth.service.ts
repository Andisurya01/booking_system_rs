import api from '@/lib/axios'
import { LoginFormValues, RegisterFormValues } from '@/modules/auth/schema/auth.schema'
import { User } from '@/modules/auth/types/authTypes'

export interface AuthResponse {
  user: {
    id: number
    uuid: string
    name: string
    email: string
  }
}

export const authService = {
  login: async (payload: LoginFormValues): Promise<User> => {
    const { data } = await api.post('/auth/login', payload)
    return data
  },

  register: async (payload: RegisterFormValues): Promise<AuthResponse> => {
    const body = {
      name: `${payload.first_name} ${payload.last_name}`,
      email: payload.email,
      password: payload.password,
    }
    const { data } = await api.post('/auth/register', body)
    return data
  },

  me: async (): Promise<AuthResponse> => {
    const {data} = await api.get('/auth/me')
    return data
  },

  logout: async () => {
    return await api.post('/auth/logout')
  },
}
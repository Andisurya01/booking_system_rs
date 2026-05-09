import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/useAuthStore'
import { LoginFormValues, RegisterFormValues } from '@/modules/auth/schema/auth.schema'

export const useLogin = () => {
    const { setAuth } = useAuthStore()
    const router = useRouter()

    return useMutation({
        mutationFn: async (payload: LoginFormValues) => authService.login(payload),
        onSuccess: (data) => {
            setAuth(data, true)
            router.replace('/dashboard')
        },
    })
}

export const useRegister = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: (payload: RegisterFormValues) => authService.register(payload),
        onSuccess: () => {
            router.push('/login')
        },
    })
}

export const useLogout = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async () => {
            authService.logout()
        },
        onSuccess: () => {
            router.push('/login')
        }
    })
}
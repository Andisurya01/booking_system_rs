'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { loginSchema, LoginFormValues } from '@/modules/auth/schema/auth.schema'
import { useLogin } from '@/modules/auth/hooks/useAuth'
import AuthLayout from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const { mutate: login, isPending, error } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (values: LoginFormValues) => {
        login(values)
    }

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold text-green-600 mb-1">
                Selamat Datang Kembali!
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                masukan informasi login anda di bawa
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="email" className="text-sm text-gray-600">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email"
                        {...register('email')}
                        className={errors.email ? 'border-red-400' : ''}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password" className="text-sm text-gray-600">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('password')}
                            className={errors.password ? 'border-red-400 pr-10' : 'pr-10'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {error && (
                    <p className="text-xs text-red-500 text-center">
                        Email atau password salah. Silakan coba lagi.
                    </p>
                )}
                <Button className='w-full' type='submit'
                    disabled={isPending}
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Masuk'}
                </Button>
            </form>

            <div className="flex justify-between mt-4 text-sm">
                <Link href="/register" className="text-gray-500 hover:text-green-600 underline">
                    Belum punya akun? register
                </Link>
            </div>
        </AuthLayout>
    )
}
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { registerSchema, RegisterFormValues } from '@/modules/auth/schema/auth.schema'
import { useRegister } from '@/modules/auth/hooks/useAuth'
import AuthLayout from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: register_, isPending, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (values: RegisterFormValues) => {
    register_(values)
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-green-600 mb-1">
        Belum punya akun?
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Silahkan isi data diri dibawah
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama depan + belakang */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-sm text-gray-600">Nama depan</Label>
            <Input
              placeholder="Nama depan"
              {...register('first_name')}
              className={errors.first_name ? 'border-red-400' : ''}
            />
            {errors.first_name && (
              <p className="text-xs text-red-500">{errors.first_name.message}</p>
            )}
          </div>
        </div>


        {/* Email */}
        <div className="space-y-1">
          <Label className="text-sm text-gray-600">Email</Label>
          <Input
            type="email"
            placeholder="email@contoh.com"
            {...register('email')}
            className={errors.email ? 'border-red-400' : ''}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label className="text-sm text-gray-600">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={showPassword ? 'password' : '••••••••'}
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

        {/* API error */}
        {error && (
          <p className="text-xs text-red-500 text-center">
            Registrasi gagal. Email mungkin sudah digunakan.
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Daftar'}
        </Button>
      </form>

      {/* Link ke login */}
      <div className="mt-4 text-sm text-center">
        <Link href="/login" className="text-gray-500 hover:text-green-600 underline">
          Sudah punya akun? Masuk
        </Link>
      </div>
    </AuthLayout>
  )
}
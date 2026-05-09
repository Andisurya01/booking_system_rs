"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react"

import { loginResolver, LoginFormValues } from "@/modules/auth/login/schema/auth.schema"
import { useLogin } from "@/modules/auth/login/hooks/useLogin"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<LoginFormValues>({
    resolver: loginResolver,
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  const { mutate: login, isPending } = useLogin({
    setError: form.setError,
  })

  const onSubmit = (values: LoginFormValues): void => login(values)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Wellcome back!</CardTitle>
        <CardDescription>
          Masukan email dan password di bawah
        </CardDescription>
      </CardHeader>
      <CardContent>

        <form onSubmit={form.handleSubmit(onSubmit)} className=" " noValidate>

          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
            </Alert>
          )}

          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="nama@contoh.com"
                    autoComplete="email"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="current-password"
                      disabled={isPending}
                      aria-invalid={fieldState.invalid}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex items-center justify-between">

            <Link
              href="/auth/verify-email"
              className="text-sm text-primary hover:underline underline-offset-4"
            >
              Sudah punya akun? register
            </Link>
          </div>

          <Button variant={"secondary"} type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Masuk...</>
            ) : (
              <><LogIn className="mr-2 h-4 w-4" />Masuk</>
            )}
            {
              isPending ? true : false;
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
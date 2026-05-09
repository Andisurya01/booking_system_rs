"use client"

import { Input } from "@/components/ui/input"

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

interface Props {
  label: string
  placeholder?: string
  type?: string
  error?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function FormInput({
  label,
  placeholder,
  type = "text",
  error,
  inputProps,
}: Props) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      <FieldContent>
        <Input
          type={type}
          placeholder={placeholder}
          {...inputProps}
        />

        {error && (
          <FieldError>
            {error}
          </FieldError>
        )}
      </FieldContent>
    </Field>
  )
}
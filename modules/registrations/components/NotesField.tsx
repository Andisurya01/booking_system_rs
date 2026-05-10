"use client"

import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field"

import { Textarea } from "@/components/ui/textarea"

import { UseFormReturn } from "react-hook-form"

import { RegistrationSchema } from '@/modules/registrations/schema/registration.schema'

interface Props {
  form: UseFormReturn<RegistrationSchema>
}

export function NotesField({
  form,
}: Props) {
  return (
    <Field>
      <FieldLabel>
        Catatan untuk dokter
      </FieldLabel>

      <FieldContent>
        <Textarea
          rows={5}
          placeholder="Tuliskan keluhan atau riwayat kesehatan..."
          {...form.register("note")}
        />
      </FieldContent>
    </Field>
  )
}
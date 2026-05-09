"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import {
  registrationSchema,
  RegistrationSchema,
} from "@/modules/registrations/schema/registration.schema"

import { Schedule } from "@/modules/registrations/schema/registration.schema" 

import { BookingSummaryCard } from "./components/BookingSummaryCard"

import { NotesField } from "./components/NotesField"

import { PatientTypeSelector } from "./components/PatientTypeSelector"

import { useCreateRegistration } from "./hooks/useRegistration"

import { RegistrationSuccessDialog } from "./components/RegistrationSuccessDialog"

interface Props {
  schedule: Schedule
}

export function RegistrationForm({
  schedule,
}: Props) {
  const [open, setOpen] = useState(false)

  const mutation =
    useCreateRegistration()

  const form =
    useForm<RegistrationSchema>({
      resolver: zodResolver(
        registrationSchema,
      ),

      defaultValues: {
        patient_type: "general",
        notes: "",
      },
    })

  const onSubmit = async (
    values: RegistrationSchema,
  ) => {
    await mutation.mutateAsync({
      schedule_id: schedule.id,
      patient_type:
        values.patient_type,
      notes: values.notes,
      insurance_id:
        values.insurance_id,
    })

    setOpen(true)
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(
          onSubmit,
        )}
        className="space-y-8"
      >
        <div>
          <h2 className="mb-5 text-4xl font-semibold">
            Tipe kunjungan
          </h2>

          <PatientTypeSelector
            form={form}
          />
        </div>

        <BookingSummaryCard
          schedule={schedule}
        />

        <NotesField form={form} />

        <div>
          <Button
            type="submit"
            disabled={
              mutation.isPending
            }
            className="h-14 w-full text-lg"
          >
            {mutation.isPending
              ? "Memproses..."
              : "Konfirmasi register"}
          </Button>

          <p className="mt-4 text-center text-sm text-zinc-500">
            Dengan menekan tombol di atas,
            Anda menyetujui syarat dan
            ketentuan RS.
          </p>
        </div>
      </form>

      <RegistrationSuccessDialog
        open={open}
        onOpenChange={setOpen}
        schedule={schedule}
      />
    </>
  )
}
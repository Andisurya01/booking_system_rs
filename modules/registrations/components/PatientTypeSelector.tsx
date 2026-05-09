"use client"

import { ShieldCheck, Wallet } from "lucide-react"

import { UseFormReturn } from "react-hook-form"

import { RegistrationSchema } from "../schema/registration.schema"

import { PatientTypeCard } from "./PatientTypeCard"

interface Props {
  form: UseFormReturn<RegistrationSchema>
}

export function PatientTypeSelector({
  form,
}: Props) {
  const patientType =
    form.watch("patient_type")

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <PatientTypeCard
        title="Umum"
        description="Bayar langsung di kasir"
        active={patientType === "general"}
        onClick={() =>
          form.setValue(
            "patient_type",
            "general",
          )
        }
        icon={<Wallet />}
      />

      <PatientTypeCard
        title="Asuransi"
        description="Gunakan kartu asuransi aktif"
        active={patientType === "insurance"}
        onClick={() =>
          form.setValue(
            "patient_type",
            "insurance",
          )
        }
        icon={<ShieldCheck />}
      />
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCreateRegistration } from '../hooks/useRegistration'
import { registrationSchema, RegistrationSchema } from '@/modules/registrations/schema/registration.schema'
import { BookingSummaryCard } from './BookingSummaryCard'
import { NotesField } from './NotesField'
import { PatientTypeSelector } from './PatientTypeSelector'
import { RegistrationSuccessDialog } from './RegistrationSuccessDialog'
import type { DoctorDetail } from '@/types/doctor'
import type { DoctorScheduleSlot } from '@/types/doctor'
import { Schedule } from '@/types/schedule'

interface Props {
    schedule: Schedule
    doctor: DoctorDetail
}

export function RegistrationFormContent({ schedule, doctor }: Props) {
    const [open, setOpen] = useState(false)
    const { patient } = useAuthStore()
    const mutation = useCreateRegistration()
    console.log(patient);

    const form = useForm<RegistrationSchema>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            patient_id: patient?.id,
            schedule_id: schedule.id,
            patient_type: 'general',
            note: '',
        },
    })

    const onSubmit = async (values: RegistrationSchema) => {
        console.log("ini dijalnkan");

        await mutation.mutateAsync({
            patient_id: values.patient_id,
            schedule_id: schedule.id,
            patient_type: values.patient_type,
            note: values.note,
        })

        setOpen(true)
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h2 className="mb-5 text-2xl font-semibold">Tipe kunjungan</h2>
                    <PatientTypeSelector form={form} />
                </div>

                <BookingSummaryCard schedule={schedule} doctor={doctor} />

                <NotesField form={form} />

                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="h-14 w-full text-lg"
                    onClick={() => console.log('errors:', form.formState.errors)}

                >
                    {mutation.isPending ? 'Memproses...' : 'Konfirmasi register'}
                </Button>

                <p className="mt-4 text-center text-sm text-zinc-500">
                    Dengan menekan tombol di atas, Anda menyetujui syarat dan ketentuan RS.
                </p>
            </form>

            <RegistrationSuccessDialog
                open={open}
                onOpenChange={setOpen}
                schedule={schedule}
                doctor={doctor}
            />
        </>
    )
}
'use client'

import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useSchedulesByUuid } from '../doctors/hook/useSchedules'
import { useDoctorDetail } from '../doctors/hook/useDoctor'
import { RegistrationFormContent } from './components/RegistrationFormContent'

export function RegistrationForm() {
  const params = useParams<{ uuid: string; registUUID: string }>()

  const {
    data: schedule,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useSchedulesByUuid(params.registUUID)

  const {
    data: doctor,
    isLoading: doctorLoading,
    isError: doctorError,
  } = useDoctorDetail(params.uuid)

  if (scheduleLoading || doctorLoading) {
    return (
      <div className="flex items-center justify-center py-20 gap-2 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin text-green-500" />
        <span>Memuat data booking...</span>
      </div>
    )
  }

  if (scheduleError || doctorError || !schedule || !doctor?.data) {
    return (
      <div className="text-center py-20 text-gray-400">
        Data jadwal atau dokter tidak ditemukan.
      </div>
    )
  }

  return (
    <RegistrationFormContent
      schedule={schedule}
      doctor={doctor.data}
    />
  )
}
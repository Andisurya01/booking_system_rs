import {
  CalendarDays,
  Clock3,
} from "lucide-react"

import { format } from "date-fns"

import { id } from "date-fns/locale"

import { Schedule } from "@/types/schedule"
import { DoctorDetail } from "@/types/doctor"

interface Props {
  schedule: Schedule
  doctor: DoctorDetail
}

export function BookingSummaryCard({
  schedule, doctor
}: Props) {
  return (
    <div className="rounded-3xl bg-[#F3FAEF] p-6">
      <h2 className="mb-6 text-3xl font-semibold">
        Ringkasan
      </h2>

      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-full bg-green-200" />

          <div>
            <p className="text-sm uppercase text-zinc-500">
              Dokter
            </p>

            <h3 className="text-2xl font-semibold">
              {doctor.user.name}
            </h3>

            <div className="mt-4 flex items-center gap-2 text-lg">
              <CalendarDays className="h-5 w-5 text-green-600" />

              <span>
                {format(
                  new Date(
                    schedule.schedule_date,
                  ),
                  "EEEE, d MMMM yyyy",
                  {
                    locale: id,
                  },
                )}
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase text-zinc-500">
            Jadwal
          </p>

          <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-green-700">
            <Clock3 className="h-5 w-5" />

            <span>
              {schedule.start_time} -{" "}
              {schedule.end_time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
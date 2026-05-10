'use client'

import React, { useMemo, useState } from "react"
import { isSameDay, parseISO, format } from "date-fns"
import { usePathname } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { useSchedulesByDoctorUuid } from "../hook/useSchedules"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function DatePicker() {
    const pathname = usePathname()
    const uuid = pathname.split("/").pop()

    const [date, setDate] = useState<Date | undefined>()

    const { data: schedules = [] } = useSchedulesByDoctorUuid(String(uuid))

    const selectedSchedule = useMemo(() => {
        if (!date || !schedules.length) return null

        return schedules.find((s) =>
            isSameDay(parseISO(s.schedule_date), date)
        ) || null
    }, [date, schedules])

    const availableDatesMap = useMemo(() => {
        return new Set(
            schedules.map(s => format(parseISO(s.schedule_date), 'yyyy-MM-dd'))
        )
    }, [schedules])

    return (
        <div className="space-y-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(currDate) => {
                    const formattedDate = format(currDate, 'yyyy-MM-dd')
                    return !availableDatesMap.has(formattedDate)
                }}
                className="w-full rounded-lg border"
            />

            {selectedSchedule && (
                <div className="p-4 border rounded-md bg-muted">
                    <p className="text-sm font-medium">Jadwal Terpilih:</p>
                    <p className="text-xs text-muted-foreground">{selectedSchedule.schedule_date}</p>
                </div>
            )}

            <div className='pt-4'>
                <Button
                    className='w-full'
                >
                    <Link href={`/doctors/${uuid}/registrations/${selectedSchedule?.uuid}`}>Pilih jadwal ini</Link>
                    <ArrowRight></ArrowRight></Button>
            </div>
        </div>
    )
}
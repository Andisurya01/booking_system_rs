'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DateChipList from './DateChipList'
import TimeSlotList from './TimeSlotList'
import CalendarModal from './CalendarModal'
import { useDoctorSchedules } from '@/modules/doctors/hook/useDoctor'
import { useRouter } from 'next/navigation'

interface Props {
    doctorUuid: string
}

const MONTHS_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const getWeekDates = (anchor: Date): Date[] => {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(anchor)
        d.setDate(anchor.getDate() + i)
        return d
    })
}

export default function SchedulePanel({ doctorUuid }: Props) {
    const router = useRouter()
    const today = new Date()

    const [month, setMonth] = useState(() => {
        const m = today.getMonth() + 1
        return `${today.getFullYear()}-${String(m).padStart(2, '0')}`
    })

    const [weekAnchor, setWeekAnchor] = useState(today)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedSlotUuid, setSelectedSlotUuid] = useState<string | null>(null)
    const [showCalendar, setShowCalendar] = useState(false)

    const { data: scheduleByDate = {}, isLoading } = useDoctorSchedules(doctorUuid, month)
    console.log("ambil schedule dokter");

    const weekDates = useMemo(() => getWeekDates(weekAnchor), [weekAnchor])
    console.log("scheduleByDate keys:", Object.keys(scheduleByDate))
    console.log("weekDates:", weekDates.map(d => d.toISOString().split('T')[0]))

    const [year, monthNum] = month.split('-').map(Number)
    const monthLabel = `${MONTHS_ID[monthNum - 1]} ${year}`

    const currentSlots = selectedDate ? (scheduleByDate[selectedDate] ?? []) : []

    const handleSelectDate = (dateStr: string) => {
        setSelectedDate(dateStr)
        setSelectedSlotUuid(null)
        const m = dateStr.slice(0, 7)
        if (m !== month) setMonth(m)
    }

    const handlePrevWeek = () => {
        const prev = new Date(weekAnchor)
        prev.setDate(prev.getDate() - 7)
        setWeekAnchor(prev)
        const m = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`
        if (m !== month) setMonth(m)
    }

    const handleNextWeek = () => {
        const next = new Date(weekAnchor)
        next.setDate(next.getDate() + 7)
        setWeekAnchor(next)
        const m = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`
        if (m !== month) setMonth(m)
    }

    const handleBooking = () => {
        if (!selectedSlotUuid) return
        router.push(`/booking?schedule_uuid=${selectedSlotUuid}`)
    }

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-green-500 px-5 py-4">
                    <h2 className="text-white font-bold text-lg">Pilih Jadwal</h2>
                    <p className="text-green-100 text-sm">{monthLabel}</p>
                </div>

                <div className="p-5 space-y-5">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-gray-800">Pilih Tanggal</span>
                            <button
                                onClick={() => setShowCalendar(true)}
                                className="text-sm text-green-600 font-medium flex items-center gap-1 hover:underline"
                            >
                                <CalendarDays className="w-4 h-4" />
                                Lihat Kalender
                            </button>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                            <button
                                onClick={handlePrevWeek}
                                disabled={weekAnchor <= today}
                                className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-500" />
                            </button>

                            {isLoading ? (
                                <div className="flex-1 flex justify-center py-4">
                                    <Loader2 className="w-5 h-5 animate-spin text-green-500" />
                                </div>
                            ) : (
                                <DateChipList
                                    dates={weekDates}
                                    scheduleByDate={scheduleByDate}
                                    selectedDate={selectedDate}
                                    onSelect={handleSelectDate}
                                />
                            )}

                            <button
                                onClick={handleNextWeek}
                                className="p-1 rounded-lg hover:bg-gray-100"
                            >
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    {selectedDate && (
                        <div>
                            <p className="font-semibold text-gray-800 mb-3">Pilih Jam</p>
                            <TimeSlotList
                                slots={currentSlots}
                                selectedUuid={selectedSlotUuid}
                                onSelect={setSelectedSlotUuid}
                            />
                        </div>
                    )}
                    <Button
                        onClick={handleBooking}
                        disabled={!selectedSlotUuid}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6 rounded-xl disabled:opacity-40"
                    >
                        Pilih jadwal ini
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            <CalendarModal
                open={showCalendar}
                onClose={() => setShowCalendar(false)}
                scheduleByDate={scheduleByDate}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                currentMonth={month}
                onMonthChange={(m) => {
                    setMonth(m)
                    const [y, mo] = m.split('-').map(Number)
                    setWeekAnchor(new Date(y, mo - 1, 1))
                }}
            />
        </>
    )
}
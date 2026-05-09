'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScheduleByDate } from '@/types/doctor'

interface Props {
  open: boolean
  onClose: () => void
  scheduleByDate: ScheduleByDate
  selectedDate: string | null
  onSelectDate: (dateStr: string) => void
  // Untuk fetch bulan berbeda dari modal
  currentMonth: string         // "YYYY-MM"
  onMonthChange: (month: string) => void
}

const MONTHS_ID = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember'
]
const DAY_LABELS = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']

export default function CalendarModal({
  open, onClose, scheduleByDate, selectedDate, onSelectDate, currentMonth, onMonthChange
}: Props) {
  const [year, month] = currentMonth.split('-').map(Number)

  const prevMonth = () => {
    const d = new Date(year, month - 2, 1)
    onMonthChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  const nextMonth = () => {
    const d = new Date(year, month, 1)
    onMonthChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  // Bangun grid kalender
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    if (!scheduleByDate[dateStr]) return
    onSelectDate(dateStr)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            Pilih Tanggal
          </DialogTitle>
        </DialogHeader>

        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-semibold text-gray-800">
            {MONTHS_ID[month - 1]} {year}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />

            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const hasSchedule = !!scheduleByDate[dateStr]
            const isSelected = selectedDate === dateStr
            const today = new Date().toISOString().split('T')[0]
            const isPast = dateStr < today

            return (
              <button
                key={dateStr}
                disabled={!hasSchedule || isPast}
                onClick={() => handleDayClick(day)}
                className={cn(
                  'w-8 h-8 mx-auto rounded-full text-sm flex items-center justify-center transition-all',
                  isSelected
                    ? 'bg-green-500 text-white font-bold'
                    : hasSchedule && !isPast
                    ? 'bg-green-100 text-green-700 font-medium hover:bg-green-200 cursor-pointer'
                    : 'text-gray-300 cursor-not-allowed'
                )}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-100" />
            <span>Ada jadwal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Dipilih</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
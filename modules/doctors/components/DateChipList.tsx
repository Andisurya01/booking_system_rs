'use client'

import { cn } from '@/lib/utils'
import { ScheduleByDate } from '@/types/doctor'

interface Props {
  // 7 tanggal yang ditampilkan (sliding window dari hari ini)
  dates: Date[]
  scheduleByDate: ScheduleByDate
  selectedDate: string | null
  onSelect: (dateStr: string) => void
}

const DAY_LABELS = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

export default function DateChipList({ dates, scheduleByDate, selectedDate, onSelect }: Props) {
  return (
    <div className="flex gap-2">
      {dates.map((date) => {
        const dateStr = date.toISOString().split('T')[0]
        const hasSchedule = !!scheduleByDate[dateStr]
        const isSelected = selectedDate === dateStr
        const dayLabel = DAY_LABELS[date.getDay()]
        const dayNum = date.getDate()

        return (
          <button
            key={dateStr}
            disabled={!hasSchedule}
            onClick={() => onSelect(dateStr)}
            className={cn(
              'flex flex-col items-center justify-center w-14 h-16 rounded-xl text-sm font-medium transition-all',
              isSelected && hasSchedule
                ? 'bg-green-500 text-white border-2 border-green-500'
                : hasSchedule
                ? 'bg-white border-2 border-green-500 text-green-600 hover:bg-green-50'
                : 'bg-white border border-gray-200 text-gray-300 cursor-not-allowed'
            )}
          >
            <span className="text-xs font-semibold">{dayLabel}</span>
            <span className="text-lg font-bold leading-tight">{dayNum}</span>
          </button>
        )
      })}
    </div>
  )
}
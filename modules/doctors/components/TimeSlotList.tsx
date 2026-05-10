'use client'

import { cn } from '@/utils/utils'
import { DoctorScheduleSlot } from '@/types/doctor'

interface Props {
  slots: DoctorScheduleSlot[]
  selectedUuid: string | null
  onSelect: (uuid: string) => void
}

export default function TimeSlotList({ slots, selectedUuid, onSelect }: Props) {
  if (slots.length === 0) {
    return <p className="text-sm text-gray-400">Tidak ada jadwal tersedia.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((slot) => {
        const isSelected = selectedUuid === slot.uuid
        const label = `${slot.start_time} - ${slot.end_time}`

        return (
          <button
            key={slot.uuid}
            onClick={() => onSelect(slot.uuid)}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium border transition-all',
              isSelected
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-gray-200 text-gray-700 hover:border-green-300 bg-white'
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
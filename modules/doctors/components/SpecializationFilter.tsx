'use client'

import { cn } from '@/lib/utils'
import { Specialization } from '@/types/specialization'

interface Props {
  specializations: Specialization[]
  selected: string | undefined
  onChange: (uuid: string | undefined) => void
}

export default function SpecializationFilter({ specializations, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(undefined)}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
          !selected
            ? 'bg-green-500 text-white'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'
        )}
      >
        Semua
      </button>
      {specializations.map((s) => (
        <button
          key={s.uuid}
          onClick={() => onChange(s.uuid)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
            selected === s.uuid
              ? 'bg-green-500 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'
          )}
        >
          {s.name}
        </button>
      ))}
    </div>
  )
}
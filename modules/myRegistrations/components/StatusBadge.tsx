import { cn } from '@/lib/utils'
import { StatusRegistration } from '@/types/myRegistration'

const STATUS_CONFIG: Record<StatusRegistration, { label: string; className: string }> = {
  registered:  { label: 'Booked',       className: 'bg-green-100 text-green-700' },
  rescheduled: { label: 'Rescheduled',  className: 'bg-yellow-100 text-yellow-700' },
  cancelled:   { label: 'Cancelled',    className: 'bg-red-100 text-red-600' },
  no_show:     { label: 'No show',      className: 'bg-gray-100 text-gray-500' },
  completed:   { label: 'Completed',    className: 'bg-blue-100 text-blue-700' },
}

export default function StatusBadge({ status }: { status: StatusRegistration }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', cfg.className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {cfg.label}
    </span>
  )
}
'use client'

import Link from 'next/link'
import { MapPin, Hash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/modules/myRegistrations/components/StatusBadge'
import { RegistrationItem } from '@/types/myRegistration'
import { cn } from '@/utils/utils'

interface Props {
    registration: RegistrationItem
    // onCancel?: (uuid: string) => void
    // isCancelling?: boolean
}

const getInitials = (name: string) =>
    name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase()

const formatDateTime = (date: string, start: string, end: string) => {
    const d = new Date(date)
    const label = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    return { dateLabel: label, timeLabel: `${start.slice(0, 5)} WIB` }
}

const CANCELLABLE: string[] = ['registered', 'rescheduled']

export default function BookingCard({ registration }: Props) {
    const { schedule, status, uuid, patient_type, queue_general, queue_insurance } = registration
    const doctor = schedule.doctor
    const spec = doctor.specializations[0]?.specialization?.name ?? 'Dokter Umum'
    const { dateLabel, timeLabel } = formatDateTime(schedule.schedule_date, schedule.start_time, schedule.end_time)
    const queueNum = patient_type === 'general' ? queue_general : queue_insurance
    const queueCode = schedule.room ? `${schedule.room.room_code}-${queueNum}` : `#${queueNum}`
    const locationLabel = schedule.room
        ? `${schedule.room.location.name} - ${schedule.room.room_code}`
        : '-'

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={doctor.url_image_profile ?? undefined} />
                        <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
                            {getInitials(doctor.user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-gray-900">{doctor.initial_name}</p>
                        <p className="text-sm text-gray-500">{spec}</p>
                        <div className="mt-1"><StatusBadge status={status} /></div>
                    </div>
                </div>

                <div className="bg-green-50 rounded-xl px-3 py-2 text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-800">{dateLabel}</p>
                    <p className="text-sm text-gray-500">{timeLabel}</p>
                </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{locationLabel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span>Antrean: {queueCode}</span>
                </div>
            </div>

            <div className={cn('grid gap-2', CANCELLABLE.includes(status) ? 'grid-cols-2' : 'grid-cols-1')}>
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white rounded-xl">
                    <Link href={`/mybookings/${uuid}`}>Lihat detail</Link>
                </Button>
                {/* {CANCELLABLE.includes(status) && onCancel && (
                    <Button
                        variant="outline"
                        disabled={isCancelling}
                        onClick={() => onCancel(uuid)}
                        className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                        Batalkan
                    </Button>
                )} */}
            </div>
        </div>
    )
}
import Link from 'next/link'
import { Calendar, MapPin } from 'lucide-react'
import { DoctorScheduleWithRelations } from '@/types/schedule'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  schedule: DoctorScheduleWithRelations
}

// Helper: format jadwal hari
const formatDay = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })
}

const getInitials = (name: string) =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()

export default function DoctorCard({ schedule }: Props) {
  const { doctor_uuid, location_name, room_code, schedule_date, start_time, end_time} = schedule
//   const primarySpec = doctor.specializations[0]?.specialization

  return (
    <Link href={`/doctors/${doctor_uuid}`}>
      <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-green-200 transition-all cursor-pointer group">
        {/* Header: Avatar + Badge */}
        <div className="flex items-start justify-between mb-3">
          {/* <Avatar className="w-12 h-12 bg-green-500">
            <AvatarImage src={doctor.url_image_profile ?? undefined} />
            <AvatarFallback className="bg-green-500 text-white font-semibold">
              {getInitials(doctor.initial_name)}
            </AvatarFallback>
          </Avatar> */}
          <Badge
            variant={status === 'active' ? 'default' : 'secondary'}
            className={status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
          >
            {/* {status === 'active' ? 'Tersedia' : status === 'pending_change' ? 'Pending' : 'Tidak Aktif'} */}
            status
          </Badge>
        </div>

        {/* Doctor Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {schedule.doctor_name}
          </h3>
          {/* <p className="text-sm text-gray-500">{primarySpec?.name ?? 'Dokter Umum'}</p> */}
        </div>

        {/* Schedule Info */}
        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>
              {formatDay(schedule_date)}, {start_time.slice(0, 5)} - {end_time.slice(0, 5)}
            </span>
          </div>
          {room_code && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>
                {location_name} - {room_code}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
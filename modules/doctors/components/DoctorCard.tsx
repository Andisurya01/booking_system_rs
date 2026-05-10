import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DoctorDetail } from '@/types/doctor'

interface Props {
  doctor: DoctorDetail
}

export default function DoctorCard({ doctor }: Props) {
  //   const primarySpec = doctor.specializations[0]?.specialization

  return (
    <Link href={`/doctors/${doctor.uuid}`}>
      <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-green-200 transition-all cursor-pointer group">
        {/* Header: Avatar + Badge */}
        <div className="flex items-start justify-between mb-3">
          <Avatar className="w-12 h-12 bg-green-500">
            {/* <AvatarImage src={doctor.url_image_profile ?? undefined} /> */}
            <AvatarFallback className="bg-green-500 text-white font-semibold">
              {/* {getInitials(doctor.initial_name)} */}
              {doctor.initial_name}
            </AvatarFallback>
          </Avatar>
          <Badge
            variant={status === 'active' ? 'default' : 'secondary'}
            className={status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
          >
            {/* {status === 'active' ? 'Tersedia' : status === 'pending_change' ? 'Pending' : 'Tidak Aktif'} */}
            status
          </Badge>
        </div>

        {/* Doctor Info */}
        <div className="">
          <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {doctor.user.name}
          </h3>
          {/* <p className="text-sm text-gray-500">{primarySpec?.name ?? 'Dokter Umum'}</p> */}
        </div>
        <div className="mb-3 flex gap-2">
          {doctor.specializations.map((item) => (

            <div key={item.specialization.uuid}>
              <Badge className='bg-gray-100 text-gray-700'>
                {item.specialization.name}
              </Badge>
            </div>
          ))}
          {/* <p className="text-sm text-gray-500">{primarySpec?.name ?? 'Dokter Umum'}</p> */}
        </div>

        {/* Schedule Info
        <div className="space-y-1.5 text-sm text-gray-600">
          {doctor.room.room_code && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>
                {doctor.room.location.name} - {doctor.room.room_code}
              </span>
            </div>
          )}
        </div> */}
      </div>
    </Link>
  )
}
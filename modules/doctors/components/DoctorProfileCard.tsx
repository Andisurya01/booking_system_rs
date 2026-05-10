import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BadgeCheck, Share2 } from 'lucide-react'
import { DoctorDetail } from '@/types/doctor'
import { Badge } from '@/components/ui/badge'

interface Props {
    doctor: DoctorDetail
}

export default function DoctorProfileCard({ doctor }: Props) {
    const handleShare = () => {
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="relative">
                    <Avatar className="w-28 h-28 rounded-2xl">
                        <AvatarImage src={doctor.url_image_profile ?? undefined} className="object-cover" />
                        <AvatarFallback className=" text-teal-700 text-2xl font-bold rounded-2xl">
                            {doctor.initial_name}
                        </AvatarFallback>
                    </Avatar>
                    {/* Verified badge */}
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                        <BadgeCheck className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{doctor.user.name}</h1>
                            <div className="text-green-600 font-medium mt-0.5">
                                {doctor.specializations.map((item) => (

                                    <div key={item.specialization.uuid}>
                                        <Badge className='bg-gray-100 text-gray-700'>
                                            {item.specialization.name}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <Share2 className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* SIP number jika perlu ditampilkan */}
                    {doctor.specializations[0]?.license_number_sip && (
                        <p className="text-xs text-gray-400 mt-2">
                            SIP: {doctor.specializations[0].license_number_sip}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
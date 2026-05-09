'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Loader2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DoctorProfileCard from '@/modules/doctors/components/DoctorProfileCard'
import SchedulePanel from '@/modules/doctors/components/SchedulePanel'
import { useDoctorDetail } from '@/modules/doctors/hook/useDoctor'

export default function DoctorDetailPage() {
    const params = useParams<{ uuid: string }>()
    const { data, isLoading, isError } = useDoctorDetail(params.uuid)
    console.log(params.uuid);

    const doctor = data?.data

    if (isLoading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                </div>
            </>
        )
    }

    if (isError || !doctor) {
        return (
            <>
                <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-500">
                    <p className="text-lg">Dokter tidak ditemukan.</p>
                    <p>{data?.data.initial_name == undefined ? "tes": doctor?.initial_name}</p>
                    <Link href="/doctors" className="text-green-600 hover:underline text-sm">
                        Kembali ke daftar dokter
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <main className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-green-600">Beranda</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/doctors" className="hover:text-green-600">Cari Dokter</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-800 font-medium">{doctor.initial_name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
                    <div className="space-y-4">
                        <DoctorProfileCard doctor={doctor} />

                        {doctor.bio && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Bio Profesional</h2>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                                    {doctor.bio.split('\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-20">
                        <SchedulePanel doctorUuid={params.uuid} />
                    </div>
                </div>
            </main>
        </>
    )
}
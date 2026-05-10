'use client'

import Link from 'next/link'
import { CalendarDays, BarChart2, PlusCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMyMembers } from '@/modules/users/hooks/useMember'
import { useState } from 'react'
import PatientProfileModal from '@/modules/users/components/PatientProfileModal'
import { useRegistrationSummary } from '@/modules/myRegistrations/hooks/useRegistration'

export default function DashboardPage() {
    const [showProfileModal, setShowProfileModal] = useState(false)
    const { patient } = useAuthStore()
    const { data: profiles = [], isLoading: loadingProfiles } = useMyMembers()
    const { data: summaryRes, isPending } = useRegistrationSummary(patient?.uuid)

    const summary  = summaryRes?.data
    const upcoming = summary?.upcoming ?? []

    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            <PatientProfileModal
                open={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                profiles={profiles}
                isLoading={loadingProfiles}
                onSelect={() => {}}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Selamat datang, {patient?.name}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Kelola jadwal konsultasi dan pantau kesehatan Anda hari ini.
                    </p>
                </div>
                <Button onClick={() => setShowProfileModal(true)}>Ganti Profile</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                    {
                        icon:  CalendarDays,
                        label: 'Register aktif',
                        value: summary?.active_count ?? 0,
                        color: 'bg-green-100 text-green-700',
                    },
                    {
                        icon:  BarChart2,
                        label: 'Total kunjungan',
                        value: summary?.total_count ?? 0,
                        color: 'bg-blue-100 text-blue-700',
                    },
                ].map(({ icon: Icon, label, value, color }) => (
                    <div
                        key={label}
                        className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{label}</p>
                            {isPending ? (
                                <div className="w-8 h-6 bg-gray-100 animate-pulse rounded mt-1" />
                            ) : (
                                <p className="text-2xl font-bold text-gray-900">{value}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Jadwal Mendatang</h2>
                        <Link
                            href="/mybookings"
                            className="text-sm text-green-600 flex items-center gap-0.5 hover:underline"
                        >
                            Lihat semua <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {isPending ? (
                            // Skeleton
                            Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl border border-gray-100 p-5 h-24 animate-pulse"
                                />
                            ))
                        ) : upcoming.length === 0 ? null : (
                            upcoming.map((reg) => (
                                <div
                                    key={reg.uuid}
                                    className="bg-white rounded-2xl border border-gray-100 p-5"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            {/* Tanggal & jam */}
                                            <p className="text-sm text-gray-500">
                                                {new Date(reg.schedule.schedule_date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    day:     'numeric',
                                                    month:   'long',
                                                    year:    'numeric',
                                                })}
                                                {' · '}
                                                {reg.schedule.start_time} - {reg.schedule.end_time}
                                            </p>

                                            {/* Lokasi */}
                                            <p className="text-sm text-gray-400 mt-0.5">
                                                {reg.schedule.room?.room_code} —{' '}
                                                {reg.schedule.room?.location?.name}
                                            </p>
                                        </div>

                                        {/* Kode antrian */}
                                        <span className="text-lg font-bold text-green-600">
                                            {reg.code_queue}
                                        </span>
                                    </div>

                                    {/* Status badge */}
                                    <div className="mt-3">
                                        <span className={`
                                            inline-block text-xs font-medium px-2.5 py-1 rounded-full
                                            ${reg.status === 'registered'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'}
                                        `}>
                                            {reg.status === 'registered' ? 'Terdaftar' : 'Dijadwalkan Ulang'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Tambah baru */}
                        <Link href="/doctors">
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-green-300 hover:bg-green-50/30 transition-colors cursor-pointer">
                                <PlusCircle className="w-8 h-8 text-gray-400" />
                                <p className="text-sm text-gray-500">Buat janji temu baru</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Kolom kanan */}
                <div />
            </div>
        </main>
    )
}
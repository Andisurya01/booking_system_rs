'use client'

import Link from 'next/link'
import { CalendarDays, BarChart2, PlusCircle, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookingCard from '@/components/booking/BookingCard'
import { useDashboardSummary, useUpcomingRegistrations, useCancelRegistration } from '@/modules/myRegistrations/hooks/useRegistration'
import { useAuthStore } from '@/stores/useAuthStore'

export default function DashboardPage() {
    const { user } = useAuthStore()
    const { data: summaryData, isLoading: loadingSummary } = useDashboardSummary()
    const { data: upcomingData, isLoading: loadingUpcoming } = useUpcomingRegistrations()
    const { mutate: cancel, isPending: isCancelling, variables: cancellingUuid } = useCancelRegistration()

    //   const summary = summaryData?.data
    // const upcoming = upcomingData?.data ?? []
    const firstName = user?.name?.split(' ')[0] ?? 'Pengguna'

    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Selamat datang, {firstName}</h1>
                    <p className="text-gray-500 mt-1">Kelola jadwal konsultasi dan pantau kesehatan Anda hari ini.</p>
                </div>
                <Button asChild className="">
                    <Link href="/">Ganti Profile</Link>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                    //   { icon: CalendarDays, label: 'Register aktif', value: summary?.active_registrations ?? 0, color: 'bg-green-100 text-green-700' },
                    { icon: CalendarDays, label: 'Register aktif', value: 0, color: 'bg-green-100 text-green-700' },
                    //   { icon: BarChart2,    label: 'Total kunjungan', value: summary?.total_visits ?? 0,         color: 'bg-green-100 text-green-700' },
                    { icon: BarChart2, label: 'Total kunjungan', value: 0, color: 'bg-green-100 text-green-700' },
                ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{label}</p>
                            {loadingSummary
                                ? <div className="w-8 h-6 bg-gray-100 animate-pulse rounded mt-1" />
                                : <p className="text-2xl font-bold text-gray-900">{value}</p>
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                {/* Jadwal Mendatang */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Jadwal Mendatang</h2>
                        <Link href="/booking-saya" className="text-sm text-green-600 flex items-center gap-0.5 hover:underline">
                            Lihat semua <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {/* {loadingUpcoming ? (
                            <div className="flex justify-center py-10">
                                <Loader2 className="w-6 h-6 animate-spin text-green-500" />
                            </div>
                        ) : upcoming.length === 0 ? (
                            null // langsung tampilkan tombol buat baru
                        ) : (
                            upcoming.map((reg) => (
                                <BookingCard
                                    key={reg.uuid}
                                    registration={reg}
                                    onCancel={(uuid) => cancel(uuid)}
                                    isCancelling={isCancelling && cancellingUuid === reg.uuid}
                                />
                            ))
                        )} */}

                        {/* Add new slot */}
                        <Link href="/cari-dokter">
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-green-300 hover:bg-green-50/30 transition-colors cursor-pointer">
                                <PlusCircle className="w-8 h-8 text-gray-400" />
                                <p className="text-sm text-gray-500">Buat janji temu baru</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Placeholder kolom kanan — bisa diisi notif nanti */}
                <div />
            </div>
        </main>
    )
}
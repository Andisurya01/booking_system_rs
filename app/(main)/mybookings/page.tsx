'use client'

import { useState } from 'react'
import { useRegistrations, useCancelRegistration } from '@/modules/myRegistrations/hooks/useRegistration'
// import { useSpecializations } from '@/modules/doctors/hook/useSchedules'
import BookingCard from '@/components/booking/BookingCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RegistrationItem, StatusRegistration } from '@/types/myRegistration'
import { Loader2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_FILTERS: { label: string; value: StatusRegistration | 'all' }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Registered', value: StatusRegistration.registered },
    { label: 'Rescheduled', value: StatusRegistration.rescheduled },
    { label: 'Completed', value: StatusRegistration.completed },
    { label: 'No Show', value: StatusRegistration.no_show },
    { label: 'Cancelled', value: StatusRegistration.cancelled },
]

export default function BookingSayaPage() {
    const [search, setSearch] = useState('')
    const [activeStatus, setActiveStatus] = useState<StatusRegistration | 'all'>('all')
    const [page, setPage] = useState(1)

    const params = {
        search: search || undefined,
        status: activeStatus === 'all' ? undefined : activeStatus,
        page,
        limit: 6,
    }

    const { data, isLoading, isFetching } = useRegistrations(params)
    const { mutate: cancel, isPending: isCancelling, variables: cancellingUuid } = useCancelRegistration()

    const registrations = data?.data ?? []
    const meta = data?.meta

    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cari jadwal kamu</h1>
                    <p className="text-gray-500 mt-1">Dapat mencari di sini</p>
                </div>
                <Button asChild className="">
                    <a href="/cari-dokter">Buat jadwal</a>
                </Button>
            </div>
            <div className="relative max-w-xs mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input
                    placeholder="Cari dokter..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                    className="pl-9"
                />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => { setActiveStatus(f.value); setPage(1) }}
                        className={cn(
                            'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
                            activeStatus === f.value
                                ? 'bg-green-500 text-white border-green-500'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                </div>
            ) : registrations.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p>Tidak ada booking ditemukan.</p>
                </div>
            ) : (
                <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity', isFetching ? 'opacity-60' : '')}>
                    {registrations.map((reg: RegistrationItem) => (
                        <BookingCard
                            key={reg.uuid}
                            registration={reg}
                            onCancel={(uuid) => cancel(uuid)}
                            isCancelling={isCancelling && cancellingUuid === reg.uuid}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {meta && meta.total_pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                        Sebelumnya
                    </Button>
                    <span className="flex items-center text-sm text-gray-600 px-3">
                        {page} / {meta.total_pages}
                    </span>
                    <Button variant="outline" disabled={page === meta.total_pages} onClick={() => setPage(p => p + 1)}>
                        Selanjutnya
                    </Button>
                </div>
            )}
        </main>
    )
}
'use client'

import { useState } from 'react'
import { useMyRegistrations } from '@/modules/myRegistrations/hooks/useRegistration'
import BookingCard from '@/components/booking/BookingCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RegistrationItem, RegistrationQueryParams, StatusRegistration } from '@/types/myRegistration'
import { Link, Loader2, Search } from 'lucide-react'
import { cn } from '@/utils/utils'
import { useAuthStore } from '@/stores/useAuthStore'
import { DoctorDetail } from '@/types/doctor'

const STATUS_FILTERS: { label: string; value: StatusRegistration | 'all' }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Terdaftar', value: StatusRegistration.registered },
    { label: 'Jadwal Ulang', value: StatusRegistration.rescheduled },
    { label: 'Selesai', value: StatusRegistration.completed },
    { label: 'Tidak Datang', value: StatusRegistration.no_show },
    { label: 'Dibatalkan', value: StatusRegistration.cancelled },
]

const LIMIT = 9

export default function BookingSayaPage() {
    const { patient } = useAuthStore()

    const [params, setParams] = useState<RegistrationQueryParams>({
        page: 1,
        limit: LIMIT,
        search: '',
        status: undefined,
    })

    const { data, isLoading, isFetching } = useMyRegistrations(patient?.uuid, params)
    // const { mutate: cancel, isPending: isCancelling, variables: cancellingUuid } = useCancelRegistration()
    
    const registrations = data?.data ?? []
    const meta = data?.meta

    const updateParams = (newParams: Partial<RegistrationQueryParams>) => {
        setParams((prev) => ({ 
            ...prev, 
            ...newParams, 
            page: newParams.page ?? 1 
        }))
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Booking Saya</h1>
                    <p className="text-gray-500 mt-1">Pantau status pendaftaran dan jadwal pemeriksaan Anda</p>
                </div>
                <Button asChild>
                    <Link href="/doctors">Buat jadwal baru</Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Cari kode antrian..."
                        value={params.search || ''}
                        onChange={(e) => updateParams({ search: e.target.value })}
                        className="pl-9"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => updateParams({ status: f.value === 'all' ? undefined : f.value })}
                            className={cn(
                                'px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                                (params.status === f.value || (f.value === 'all' && !params.status))
                                    ? 'bg-green-600 text-white border-green-600 shadow-sm'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
                    <p className="text-gray-500">Memuat data booking...</p>
                </div>
            ) : registrations.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">Tidak ada riwayat booking ditemukan.</p>
                    <Button variant="link" onClick={() => updateParams({ search: '', status: undefined })}>
                        Hapus semua filter
                    </Button>
                </div>
            ) : (
                <div className={cn(
                    'grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity', 
                    isFetching ? 'opacity-50' : 'opacity-100'
                )}>
                    {registrations.map((reg: RegistrationItem) => (
                        <BookingCard
                            key={reg.uuid}
                            registration={reg}
                            // onCancel={(uuid) => cancel(uuid)}
                            // isCancelling={isCancelling && cancellingUuid === reg.uuid}
                        />
                    ))}
                </div>
            )}

            {meta && meta.total_pages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <Button 
                        variant="outline" 
                        disabled={params.page === 1 || isFetching} 
                        onClick={() => setParams(p => ({ ...p, page: p.page - 1 }))}
                    >
                        Sebelumnya
                    </Button>
                    
                    <span className="text-sm font-medium text-gray-700">
                        Halaman {params.page} dari {meta.total_pages}
                    </span>
                    
                    <Button 
                        variant="outline" 
                        disabled={params.page === meta.total_pages || isFetching} 
                        onClick={() => setParams(p => ({ ...p, page: p.page + 1 }))}
                    >
                        Selanjutnya
                    </Button>
                </div>
            )}
        </main>
    )
}
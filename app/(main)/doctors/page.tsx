'use client'

import { useState } from 'react'
import { useSchedules, useSpecializations } from '@/modules/doctors/hook/useSchedules'
import DoctorCard from '@/modules/doctors/components/DoctorCard'
import SearchBar from '@/components/forms/SearchBar'
import SpecializationFilter from '@/modules/doctors/components/SpecializationFilter'
import { ScheduleQueryParams } from '@/types/schedule'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const LIMIT = 9

export default function CariDokterPage() {
    const [params, setParams] = useState<ScheduleQueryParams>({
        page: 1,
        limit: LIMIT,
        status: 'active',
    })

    const { data, isLoading, isFetching } = useSchedules(params)
    const { data: specData } = useSpecializations()

    const schedules = data?.data ?? []
    const meta = data?.meta
    const specializations = specData?.data ?? []

    const updateParams = (newParams: Partial<ScheduleQueryParams>) => {
        setParams((prev) => ({ ...prev, ...newParams, page: 1 }))
    }

    return (
        <>
            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Find Your Specialist</h1>
                    <p className="text-gray-500">
                        Access top-tier healthcare professionals and book your consultation in seconds.
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    <SearchBar
                        onSearch={(values) => updateParams({ search: values.search })}
                        defaultValues={{ search: params.search }}
                    />
                    <SpecializationFilter
                        specializations={specializations}
                        selected={params.specialization_uuid}
                        onChange={(uuid) => updateParams({ specialization_uuid: uuid })}
                    />
                </div>
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                    </div>
                ) : schedules.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">Tidak ada jadwal dokter ditemukan.</p>
                        <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian.</p>
                    </div>
                ) : (
                    <>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
                            {schedules.map((schedule) => (
                                <DoctorCard key={schedule.uuid} schedule={schedule} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {meta && meta.total_pages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <Button
                                    variant="outline"
                                    disabled={params.page === 1}
                                    onClick={() => setParams((p) => ({ ...p, page: (p.page ?? 1) - 1 }))}
                                >
                                    Sebelumnya
                                </Button>
                                <span className="flex items-center text-sm text-gray-600 px-3">
                                    Halaman {params.page} dari {meta.total_pages}
                                </span>
                                <Button
                                    variant="outline"
                                    disabled={params.page === meta.total_pages}
                                    onClick={() => setParams((p) => ({ ...p, page: (p.page ?? 1) + 1 }))}
                                >
                                    Selanjutnya
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>
            {/* <Footer /> */}
        </>
    )
}
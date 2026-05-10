'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, PlusCircle, Loader2, Clock } from 'lucide-react'
import { cn } from '@/utils/utils'
import { getInitials } from '@/utils/creatInitial'
import { Patient } from '@/types/patient'
import { useAuthStore } from '@/stores/useAuthStore'


interface Props {
    open: boolean
    onClose: () => void
    profiles: Patient[]
    isLoading?: boolean
    onSelect: (profile: Patient) => void
    // onAddNew: () => void
}

export default function PatientProfileModal({
    open, onClose, profiles, isLoading, onSelect
}: Props) {
    const { setPatient } = useAuthStore()
    const [selectedUuid, setSelectedUuid] = useState<string | null>(
        profiles.find(p => p.verified)?.uuid ?? null
    )

    const selectedProfile = profiles.find(p => p.uuid === selectedUuid)

    // Saat tombol "Gunakan Profil Ini" ditekan
    const handleConfirm = () => {
        if (!selectedProfile) return
        setPatient(selectedProfile)   // simpan ke global state
        onSelect(selectedProfile)     // callback ke parent
    }


    return (
        <Dialog open={open} onOpenChange={o => !o && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        Pilih Profil Pasien
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                        Pilih profil yang akan melakukan pendaftaran.
                    </p>
                </DialogHeader>

                <div className="space-y-3 mt-2">
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-green-500" />
                        </div>
                    )}

                    {!isLoading && profiles.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-6">
                            Belum ada profil pasien tersimpan.
                        </p>
                    )}

                    {!isLoading && profiles.map((profile) => {
                        const isSelected = selectedUuid === profile.uuid
                        const isVerified = profile.verified

                        return (
                            <button
                                key={profile.uuid}
                                onClick={() => isVerified && setSelectedUuid(profile.uuid)}
                                disabled={!isVerified}
                                className={cn(
                                    'w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all',
                                    isSelected
                                        ? 'border-green-500 bg-green-50'
                                        : isVerified
                                            ? 'border-gray-200 hover:border-green-300 bg-white'
                                            : 'border-dashed border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed'
                                )}
                            >
                                <div className={cn(
                                    'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ',
                                    isSelected ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'
                                )}>
                                    {getInitials(profile.name)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-gray-900">{profile.name}</span>
                                        {isVerified ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                                <Clock className="w-3 h-3" /> Menunggu verifikasi
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-0.5">NIK: {profile.nik}</p>
                                    <p className="text-sm text-gray-500">MR: {profile.medical_record_number}</p>
                                </div>

                                <div className={cn(
                                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                                    isSelected ? 'border-green-600' : 'border-gray-300'
                                )}>
                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
                                </div>
                            </button>
                        )
                    })}

                    {!isLoading && (
                        <button
                            onClick={() => { }}
                            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-600 hover:bg-green-50/40 transition-all"
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span className="font-medium">Tambah Profil Baru</span>
                        </button>
                    )}
                </div>

                {/* CTA */}
                {!isLoading && profiles.length > 0 && (
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedProfile}
                        className=" disabled:opacity-40"
                    >
                        Gunakan Profil Ini
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}
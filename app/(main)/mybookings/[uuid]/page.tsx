'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Calendar, MapPin, AlertTriangle, Info, Loader2, HeadphonesIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import StatusBadge from '@/modules/myRegistrations/components/StatusBadge'
import QueueDisplay from '@/modules/myRegistrations/components/QueueDisplay'
import { useRegistrationDetail, useCancelRegistration } from '@/modules/myRegistrations/hooks/useRegistration' 
import { StatusRegistration } from '@/types/myRegistration'
import { cn } from '@/lib/utils'

// ── helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase()

const fmtDate = (date: string) =>
  new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const fmtTime = (s: string, e: string) => `${s.slice(0, 5)} - ${e.slice(0, 5)} WIB`

const fmtDatetime = (date: string) =>
  new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

// ── Status-specific blocks ────────────────────────────────────────────────────

// Alert banner (hanya untuk rescheduled)
function RescheduledAlert() {
  return (
    <Alert className="border-red-200 bg-red-50 mb-4">
      <AlertTriangle className="w-4 h-4 text-red-500" />
      <AlertTitle className="text-red-700 font-semibold">Jadwal konsultasi Anda telah diubah</AlertTitle>
      <AlertDescription className="text-red-600 text-sm">
        Dokter berhalangan hadir pada waktu sebelumnya. Silakan tinjau jadwal baru di bawah ini.
      </AlertDescription>
    </Alert>
  )
}

// Perubahan jadwal (rescheduled only)
function ScheduleChangeBlock({ prev, current }: {
  prev: { schedule_date: string; start_time: string; end_time: string }
  current: { schedule_date: string; start_time: string; end_time: string }
}) {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-gray-900 mb-3">Perubahan Jadwal</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Lama */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Jadwal Lama</p>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <div>
              <p className="font-medium text-gray-700">{fmtDate(prev.schedule_date)}</p>
              <p className="text-sm">{fmtTime(prev.start_time, prev.end_time)}</p>
            </div>
          </div>
        </div>
        {/* Baru */}
        <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Jadwal Baru</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">{fmtDate(current.schedule_date)}</p>
              <p className="text-sm text-gray-600">{fmtTime(current.start_time, current.end_time)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Info note (registered only)
function BookedInfoNote() {
  return (
    <div className="border-l-4 border-green-500 bg-white rounded-r-xl px-4 py-3 flex gap-3 items-start">
      <Info className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-700">
        Harap hadir <strong>15 menit</strong> sebelum jadwal untuk melakukan verifikasi berkas dan pemeriksaan awal di loket pendaftaran.
      </p>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BookingDetailPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const router = useRouter()
  const { data, isLoading, isError } = useRegistrationDetail(uuid)
  const { mutate: cancel, isPending: isCancelling } = useCancelRegistration()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-500">
        <p>Booking tidak ditemukan.</p>
        <Link href="/booking-saya" className="text-green-600 hover:underline text-sm">Kembali</Link>
      </div>
    )
  }

  const reg = data.data
  const { schedule, status, patient_type, queue_general, queue_insurance, is_rescheduled, previous_schedule, created_at } = reg
  const doctor = schedule.doctor
  const spec = doctor.specializations[0]?.specialization?.name ?? 'Dokter Umum'
  const queueNum = patient_type === 'general' ? queue_general : queue_insurance
  const queueCode = schedule.room ? `${schedule.room.room_code}-${queueNum}` : `#${queueNum}`
  const locationLabel = schedule.room
    ? `${schedule.room.room_code} lt.${schedule.room.room_type}, ${schedule.room.location.name}`
    : '-'
  const patientTypeLabel = patient_type === 'general' ? 'Umum' : 'Asuransi'
  const scheduleDateLabel = `${fmtDate(schedule.schedule_date)}, ${fmtTime(schedule.start_time, schedule.end_time)}`

  const CANCELLABLE: StatusRegistration[] = [StatusRegistration.cancelled, StatusRegistration.rescheduled]
  const canCancel = CANCELLABLE.includes(status)

  const handleCancel = () => {
    cancel(uuid, { onSuccess: () => router.push('/booking-saya') })
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/booking-saya" className="hover:text-green-600">Booking saya</Link>
        <ChevronRight className="w-4 h-4" />
        <span>{doctor.initial_name}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800">ID Booking : #{uuid.slice(0, 8).toUpperCase()}</span>
      </div>

      {/* Title + status */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Detail</h1>
        <StatusBadge status={status} />
      </div>

      {/* Rescheduled alert */}
      {status === 'rescheduled' && <RescheduledAlert />}

      {/* Queue number */}
      <QueueDisplay
        queueNumber={queueCode}
        patientType={patientTypeLabel}
        scheduleDate={fmtDate(schedule.schedule_date)}
      />

      {/* Rescheduled: perubahan jadwal */}
      {status === 'rescheduled' && previous_schedule && (
        <ScheduleChangeBlock prev={previous_schedule} current={schedule} />
      )}

      {/* Detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Doctor card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={doctor.url_image_profile ?? undefined} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
                {getInitials(doctor.user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{doctor.initial_name}</p>
              <p className="text-sm text-gray-500">{spec}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span>{scheduleDateLabel}</span>
          </div>
        </div>

        {/* Location + registration info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Lokasi</p>
              <p className="text-sm font-medium text-gray-800">{locationLabel}</p>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400">Terdaftar pada</p>
              <p className="text-sm font-medium text-gray-800">{fmtDatetime(created_at)}</p>
            </div>
            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg uppercase">
              {patientTypeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Registered: info note */}
      {status === 'registered' && (
        <div className="mt-4"><BookedInfoNote /></div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-8">
        {canCancel ? (
          <Button
            variant="outline"
            disabled={isCancelling}
            onClick={handleCancel}
            className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl px-6"
          >
            {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Batalkan register'}
          </Button>
        ) : (
          <div /> // spacer
        )}

        <Button variant="ghost" className="text-green-600 hover:text-green-700 gap-2">
          <HeadphonesIcon className="w-4 h-4" />
          Hubungi Kami
        </Button>
      </div>
    </main>
  )
}
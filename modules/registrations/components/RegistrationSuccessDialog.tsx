"use client"

import Link from "next/link"

import {
  CalendarDays,
  Check,
  Clock3,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Schedule } from "../schema/registration.schema"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: Schedule
}

export function RegistrationSuccessDialog({
  open,
  onOpenChange,
  schedule,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-3xl rounded-3xl p-10">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
              <Check className="h-10 w-10" />
            </div>
          </div>

          <h1 className="text-center text-5xl font-bold">
            Register berhasil!
          </h1>

          <p className="mt-4 text-center text-2xl text-green-600">
            Jadwal kunjungan Anda telah dikonfirmasi
          </p>

          <div className="mt-10 w-full rounded-3xl bg-[#F3FAEF] p-8">
            <h2 className="text-4xl font-semibold">
              {schedule.doctor?.name}
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-10">
              <div>
                <p className="text-zinc-500">
                  Tanggal
                </p>

                <div className="mt-2 flex items-center gap-2 text-2xl font-semibold">
                  <CalendarDays className="text-green-600" />

                  <span>
                    {schedule.schedule_date}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-zinc-500">
                  Jam
                </p>

                <div className="mt-2 flex items-center gap-2 text-2xl font-semibold">
                  <Clock3 className="text-green-600" />

                  <span>
                    {schedule.start_time} -{" "}
                    {schedule.end_time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4">
            <Button
              className="h-14 text-lg"
              asChild
            >
              <Link href="/booking">
                Lihat daftar register saya
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-14 text-lg"
              asChild
            >
              <Link href="/">
                Kembali ke beranda
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
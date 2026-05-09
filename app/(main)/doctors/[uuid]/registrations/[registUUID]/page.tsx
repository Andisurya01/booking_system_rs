import { RegistrationForm } from "@/modules/registrations/RegistrationForm"

const schedule = {
  id: 1,

  uuid: "123",

  doctor_id: 1,

  room_id: 1,

  schedule_date: "2026-05-01",

  start_time: "09:00",

  end_time: "11:00",

  capacity_general: 20,

  capacity_insurance: 20,

  doctor: {
    name: "dr. Rina Kusuma, Sp.PD",
  },

  room: {
    name: "Poli Penyakit Dalam",
  },
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8">
        <RegistrationForm
          schedule={schedule}
        />
      </div>
    </main>
  )
}
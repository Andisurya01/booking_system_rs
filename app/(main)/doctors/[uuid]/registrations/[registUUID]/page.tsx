import { RegistrationForm } from "@/modules/registrations/RegistrationForm"

export default function BookingPage() {
 
  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8">
        <RegistrationForm/>
      </div>
    </main>
  )
}
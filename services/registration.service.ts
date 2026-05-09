import api from '@/lib/axios'

interface CreateRegistrationPayload {
  schedule_id: number
  patient_type: "general" | "insurance"
  notes?: string
  insurance_id?: number | null
}

export const registrationService = {
  create: async (
    payload: CreateRegistrationPayload,
  ) => {
    const response = await api.post(
      "/registrations",
      payload,
    )

    return response.data
  },
}
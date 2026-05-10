import api from '@/lib/axios'
import { CreateRegistrationPayload } from '@/types/myRegistration'

export const registrationService = {
  create: async (
    payload: CreateRegistrationPayload,
  ) => {
    console.log("apa sih ini",payload);
    
    const response = await api.post(
      "/registrations",
      payload,
    )
    console.log("ini response ini", response);

    return response.data
  },
}
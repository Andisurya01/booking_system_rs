import api from '@/lib/axios'
import { RegistrationItem, RegistrationQueryParams, RegistrationResponse, RegistrationSummary } from '@/types/myRegistration'

export const registrationService = {
    getMyRegistrations: async (uuid: string, params: RegistrationQueryParams): Promise<RegistrationResponse> => {
        const { data } = await api.get(`/registrations/${uuid}/patients`, { params })
        return data
    },

    getSummary: async (uuid: string): Promise<RegistrationSummary> => {
        const { data } = await api.get(`/registrations/summary/${uuid}`)
        return data
    },
    getRegistrationDetail: async (uuid: string): Promise<RegistrationItem> => {
        const { data } = await api.get(`/registrations/${uuid}`)
        return data.data
    }

}
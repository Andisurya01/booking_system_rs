import { useQuery } from '@tanstack/react-query'
import { registrationService } from '@/services/myRegistration.service'
import { RegistrationQueryParams } from '@/types/myRegistration'


export const useMyRegistrations = (uuid: string, params: RegistrationQueryParams) =>
  useQuery({
    queryKey: ['my-registrations', uuid, params],
    queryFn: async () => await registrationService.getMyRegistrations(uuid, params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  })

export const useRegistrationSummary = (uuid: string) =>
  useQuery({
    queryKey: ['summary', uuid],
    queryFn: async () => await registrationService.getSummary(uuid)
  })

export const useRegistrationDetail = (uuid: string) =>
  useQuery({
    queryKey: ['registration_detail', uuid],
    queryFn: async () => await registrationService.getRegistrationDetail(uuid)
  })
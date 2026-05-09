import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { registrationService } from '@/services/myRegistration'
import { RegistrationFilterQuery } from '@/types/myRegistration'

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: registrationService.getDashboardSummary,
    staleTime: 1000 * 60 * 5,
  })

export const useUpcomingRegistrations = () =>
  useQuery({
    queryKey: ['upcoming-registrations'],
    queryFn: registrationService.getUpcoming,
    staleTime: 1000 * 60 * 5,
  })

export const useRegistrations = (params: RegistrationFilterQuery) =>
  useQuery({
    queryKey: ['registrations', params],
    queryFn: () => registrationService.getAll(params),
    staleTime: 1000 * 60 * 3,
    placeholderData: (prev) => prev,
  })

export const useRegistrationDetail = (uuid: string) =>
  useQuery({
    queryKey: ['registration', uuid],
    queryFn: () => registrationService.getDetail(uuid),
    staleTime: 1000 * 60 * 5,
    enabled: !!uuid,
  })

export const useCancelRegistration = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (uuid: string) => registrationService.cancel(uuid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['registrations'] })
      qc.invalidateQueries({ queryKey: ['upcoming-registrations'] })
      qc.invalidateQueries({ queryKey: ['dashboard-summary'] })
    },
  })
}
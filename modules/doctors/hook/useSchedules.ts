import { useQuery } from '@tanstack/react-query'
import { scheduleService, specializationService } from '@/services/schedule.service'
import { ScheduleQueryParams } from '@/types/schedule'

export const useSchedules = (params: ScheduleQueryParams) => {
  return useQuery({
    queryKey: ['schedules', params],
    queryFn: () => scheduleService.getSchedules(params),
    staleTime: 1000 * 60 * 5,
    // placeholderData: (prev) => prev,
    
  })
}

export const useSpecializations = () => {
  return useQuery({
    queryKey: ['specializations'],
    queryFn: specializationService.getAll,
    staleTime: Infinity,
  })
}
import api from '@/lib/axios'
import { ScheduleQueryParams, ScheduleResponse } from '@/types/schedule'

export const scheduleService = {
  getSchedules: async (params: ScheduleQueryParams): Promise<ScheduleResponse> => {
    const { data } = await api.get('/schedules', { params })
    console.log(data);
    
    return data
  },
}

export const specializationService = {
  getAll: async () => {
    const { data } = await api.get('/specializations')
    console.log("specializations",data);
    
    return data
  },
}
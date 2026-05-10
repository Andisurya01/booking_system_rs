import api from '@/lib/axios'
import { Schedule, ScheduleQueryParams, ScheduleResponse } from '@/types/schedule'

export const scheduleService = {
  getSchedules: async (params: ScheduleQueryParams): Promise<ScheduleResponse> => {
    const { data } = await api.get('/schedules', { params })
    console.log(data);

    return data
  },
  getScheduleByDocterUuid: async (uuid: string): Promise<Schedule[]> => {
    const { data } = await api.get(`/schedules/doctors/${uuid}`)
    return data.data
  },
  getSCheduleByUuid: async (uuid: string): Promise<Schedule> => {
    const { data } = await api.get(`/schedules/${uuid}`)
    return data.data
  }
}

export const specializationService = {
  getAll: async () => {
    const { data } = await api.get('/specializations')
    console.log("specializations", data);

    return data
  },
}
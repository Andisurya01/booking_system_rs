import api from '@/lib/axios'
import { DoctorDetail, DoctorQueryParams, DoctorResponse, DoctorScheduleSlot } from '@/types/doctor'

export const doctorService = {
    getDetail: async (uuid: string): Promise<{ data: DoctorDetail }> => {
        const { data } = await api.get(`/doctors/${uuid}`)
        return data
    },
    getDoctors: async (params: DoctorQueryParams): Promise<DoctorResponse> => {
        const { data } = await api.get('/doctors', { params })
        console.log(data);

        return data
    },


    getSchedules: async (
        uuid: string,
        month: string
    ): Promise<{ data: DoctorScheduleSlot[] }> => {
        const { data } = await api.get(`/schedules/doctors/${uuid}`
                , {
              params: { month, status: 'active' },
            }
        )
        console.log(data);


        return data.data
    },
}

// export const scheduleService = {
//     getSchedules: async (params: ScheduleQueryParams): Promise<ScheduleResponse> => {
//         const { data } = await api.get('/schedules', { params })
//         console.log(data);

//         return data
//     },
// }
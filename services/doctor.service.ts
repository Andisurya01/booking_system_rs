import api from '@/lib/axios'
import { DoctorDetail, DoctorScheduleSlot } from '@/types/doctor'

export const doctorService = {
    getDetail: async (uuid: string): Promise<{ data: DoctorDetail }> => {
        const { data } = await api.get(`/doctors/${uuid}`)
        return data
    },

    getSchedules: async (
        uuid: string,
        month: string
    ): Promise<{ data: DoctorScheduleSlot[] }> => {
        const { data } = await api.get(`/schedules/doctors/${uuid}`
            //     , {
            //   params: { month, status: 'active' },
            // }
        )
        console.log(data);


        return data.data
    },
}
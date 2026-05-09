import { useQuery } from '@tanstack/react-query'
import { doctorService } from '@/services/doctor.service'
import { DoctorScheduleSlot, ScheduleByDate } from '@/types/doctor'

export const useDoctorDetail = (uuid: string) => {
  return useQuery({
    queryKey: ['doctor', uuid],
    queryFn: () => doctorService.getDetail(uuid),
    staleTime: 1000 * 60 * 10,
  })
}

export const useDoctorSchedules = (uuid: string, month: string) => {
  return useQuery({
    queryKey: ['doctor-schedules', uuid, month],
    queryFn: () => doctorService.getSchedules(uuid, month),
    staleTime: 1000 * 60 * 5,
    select: (res): ScheduleByDate => {
      // Transform array → grouped by date
      console.log(res);
      
      return res.data.reduce((acc: ScheduleByDate, slot: DoctorScheduleSlot) => {
        const key = slot.schedule_date
        if (!acc[key]) acc[key] = []
        acc[key].push(slot)
        console.log("tes",acc)
        return acc
      }, {})
    },
  })
}
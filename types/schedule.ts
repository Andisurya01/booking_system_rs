import { Specialization } from "./specialization"

export interface ScheduleQueryParams {
  search?: string
  specialization_uuid?: string
  date?: string
  status?: 'active' | 'inactive' | 'pending_change'
  page?: number
  limit?: number
}

export interface ScheduleResponse {
  data: DoctorScheduleWithRelations[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

export interface Schedule {
  id: number,
  uuid: string,
  doctor_id: number,
  room_id: number,
  schedule_date : string,
  start_time : string, 
  end_time : string,
  capacity_general : number,
  capacity_insurance : number,
  status : string,
  room: {
    uuid : string,
    room_code : string,
    room_type  : string,
    location: {
      uuid : string,
      name : string,
      description : string,
    }
  }
}

export interface DoctorScheduleWithRelations {
  id: number
  uuid: string
  doctor_uuid: string
  doctor_initial: string
  doctor_name: string
  specialization_name: string
  specialization_uuid: string
  doctor_id: number
  room_id: number | null
  schedule_date: string
  start_time: string
  end_time: string
  capacity_general: number
  capacity_insurance: number
  status: string
  room_code: string
  location_name: string
}

export interface SpecializationResponse {
  data: Specialization[]
}
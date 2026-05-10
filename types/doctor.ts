import { User } from "@/modules/auth/types/authTypes"

export interface DoctorDetail {
  uuid: string
  initial_name: string
  bio: string | null
  url_image_profile: string | null
  user: User
  specializations: {
    specialization: { uuid: string; name: string }
    license_number_sip: string
  }[]

  room: {
    room_code : string,
    location : {
      name : string
    }
  }
}

export interface DoctorQueryParams {
  search?: string
  specialization_uuid?: string
  date?: string
  status?: 'active' | 'inactive' | 'pending_change'
  page?: number
  limit?: number
}

export interface DoctorResponse {
  data: DoctorDetail[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

export interface DoctorScheduleSlot {
  id: number
  uuid: string
  schedule_date: string        
  start_time: string         
  end_time: string           
  capacity_general: number
  capacity_insurance: number
  status: 'active' | 'inactive' | 'pending_change'
  room: {
    room_code: string
    location: { name: string }
  } | null
}

export type ScheduleByDate = Record<string, DoctorScheduleSlot[]>
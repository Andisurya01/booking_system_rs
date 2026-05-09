// import { StatusRegistration, PatientType } from './index'

export interface RegistrationSummary {
  active_registrations: number
  total_visits: number
}

export enum StatusRegistration {
  registered = 'registered',
  cancelled = 'cancelled',
  rescheduled = 'rescheduled',
  no_show = 'no_show',
  completed = 'completed',
}

export enum PatientType {
  general = 'general',
  insurance = 'insurance',
}


export interface RegistrationItem {
  uuid: string
  patient_type: PatientType
  queue_general: number | null
  queue_insurance: number | null
  status: StatusRegistration
  notes: string | null
  is_rescheduled: boolean
  rescheduled_from: number | null
  created_at: string
  schedule: {
    uuid: string
    schedule_date: string
    start_time: string
    end_time: string
    doctor: {
      uuid: string
      initial_name: string
      url_image_profile: string | null
      user: { name: string }
      specializations: { specialization: { name: string } }[]
    }
    room: {
      room_code: string
      room_type: string
      location: { name: string }
    } | null
  }
  // hanya ada jika is_rescheduled = true
  previous_schedule?: {
    schedule_date: string
    start_time: string
    end_time: string
  }
}

export interface RegistrationFilterQuery {
  search?: string
  status?: StatusRegistration
  page?: number
  limit?: number
}
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

export interface RegistrationSummary {
  active_count: number
  total_count: number
  upcoming: RegistrationItem[]
}


export interface RegistrationItem {
  uuid: string
  patient_type: PatientType
  queue_general: number | null
  queue_insurance: number | null
  code_queue: string
  status: StatusRegistration
  note: string | null
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
  previous_schedule?: {
    schedule_date: string
    start_time: string
    end_time: string
  }
}

export interface CreateRegistrationPayload {
  patient_id: number
  schedule_id: number
  patient_type: "general" | "insurance"
  note?: string
}

export interface RegistrationResponse {
  data: RegistrationItem[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

export interface RegistrationQueryParams {
  search?: string
  status?: StatusRegistration
  page?: number
  limit?: number
}
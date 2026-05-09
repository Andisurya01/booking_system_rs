export interface DoctorDetail {
  uuid: string
  initial_name: string
  bio: string | null
  url_image_profile: string | null
  user: { id: number; name: string }
  specializations: {
    specialization: { uuid: string; name: string }
    license_number_sip: string
  }[]
}

export interface DoctorScheduleSlot {
  uuid: string
  schedule_date: string        // "2026-05-19"
  start_time: string           // "08:20"
  end_time: string             // "09:20"
  capacity_general: number
  capacity_insurance: number
  status: 'active' | 'inactive' | 'pending_change'
  room: {
    room_code: string
    location: { name: string }
  } | null
}

// Grouped by date untuk kemudahan UI
export type ScheduleByDate = Record<string, DoctorScheduleSlot[]>
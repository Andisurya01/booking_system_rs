import z from "zod"
export interface Schedule {
    id: number
    uuid: string
    doctor_id: number
    room_id: number
    schedule_date: string
    start_time: string
    end_time: string
    capacity_general: number
    capacity_insurance: number
    room?: {
        name: string
    }
    doctor?: {
        name: string
        photo?: string
        specialization?: string
    }
}

export interface ScheduleQueryParams {
  search?: string
  date?: string
  status?: 'active' | 'inactive' | 'pending_change'
  page?: number
  limit?: number
}

export interface ScheduleResponse {
  data: Schedule[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

export const registrationSchema = z.object({
    patient_type: z.enum([
        "general",
        "insurance",
    ]),

    notes: z.string().optional(),

    insurance_id: z
        .number()
        .nullable()
        .optional(),
})

export type RegistrationSchema =
    z.infer<typeof registrationSchema>
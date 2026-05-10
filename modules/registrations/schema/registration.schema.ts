import { Schedule } from "@/types/schedule"
import z from "zod"
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
    schedule_id: z.number(),
    patient_id: z.number(),
    patient_type: z.enum([
        "general",
        "insurance",
    ]),

    note: z.string().optional(),
})

export type RegistrationSchema =
    z.infer<typeof registrationSchema>
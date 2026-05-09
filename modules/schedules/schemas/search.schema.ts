import { z } from 'zod'

export const searchSchema = z.object({
  search: z.string().optional(),
  specialization_uuid: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending_change']).optional(),
})

export type SearchFormValues = z.infer<typeof searchSchema>
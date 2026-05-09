export interface Specialization {
    id: number
    uuid: string
    name: string
    description: string
    is_active: boolean
    created_at: Date
    deleted_at: Date | null
    updated_at: Date | null
}

export interface LoginRequest {
    email: string
    password: string
}

export interface UserRole {
    id: number
    user_id: number
    role_id: number
    role: Role
}

export interface Role {
    id: number
    uuid: string
    name: string
    description: string
    is_active: boolean
    created_at: Date
    deleted_at: Date | null
    updated_at: Date | null
}

export interface User {
    id: number
    uuid: string
    name: string
    email: string
    password: string
    verified: boolean
    is_active: boolean
    created_at: Date
    deleted_at: Date | null
    updated_at: Date | null

    roles: UserRole[]
}

export interface LoginResponse {
    user: User
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}
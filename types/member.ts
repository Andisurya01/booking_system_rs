import { Patient } from "./patient"

export interface Member {
    uuid: string
    user_id: number
    no_kk: string
    url_image_kk?: number
    verified: boolean
    is_active: boolean
    patients: {
        map(arg0: (p: any) => any): any
        patinet: Patient[]
    }
}

export interface MemberListResponse {
  success: boolean
  message: string
  data: Member[]
}
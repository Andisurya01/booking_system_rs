// "patient": {
//                         "uuid": "28eb13cd-0c03-41fa-a2f1-d0baf0028c3d",
//                         "medical_record_number": "MR-20260509-59600",
//                         "name": "andi surya",
//                         "nik": "3601330304030002",
//                         "url_image_ktp": "",
//                         "birth_date": "2003-04-03T00:00:00.000Z",
//                         "gender": "male",
//                         "blood_type": "O",
//                         "phone_number": "085693418860",
//                         "address": "kp.jeungjing",
//                         "verified": true,
//                         "is_active": true,
//                         "created_at": "2026-05-09T06:06:27.285Z",
//                         "deleted_at": null,
//                         "updated_at": "2026-05-09T06:06:54.468Z"
//                     }

export interface Patient {
    id: number
    uuid: string
    medical_record_number: string
    name: string
    nik : string
    url_image_ktp?: string
    birth_date: string
    gender: ['male', 'female']
    blood_type?: string
    phone_number: string
    address? : string
    verified: boolean
}
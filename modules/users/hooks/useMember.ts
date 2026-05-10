import { memberService } from "@/services/member.service"
import { Member, MemberListResponse } from "@/types/member"
import { Patient } from "@/types/patient"
import { useQuery } from "@tanstack/react-query"

export const useMyMembers = () =>
    useQuery({
        queryKey: ['members'],
        queryFn: memberService.getMyMember,
        select: (res: MemberListResponse): Patient[] =>
            res.data.flatMap((member: Member) =>
                member.patients.map(p => p.patient)
            ),
    })
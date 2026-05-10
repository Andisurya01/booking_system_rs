import api from "@/lib/axios";
import { Member, MemberListResponse } from "@/types/member";

export const memberService = {
  getMyMember: async (): Promise<MemberListResponse> => {
    const { data } = await api.get<MemberListResponse>('/members')
    return data  // { success, message, data: Member[] }
  },
}
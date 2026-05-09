"use client"

import { useMutation } from "@tanstack/react-query"

import { registrationService } from "@/services/registration.service"

export const useCreateRegistration = () => {
  return useMutation({
    mutationFn: registrationService.create,
  })
}
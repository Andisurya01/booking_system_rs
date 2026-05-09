"use client"

import { cn } from "@/lib/utils"

import { ReactNode } from "react"

interface Props {
  title: string
  description: string
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

export function PatientTypeCard({
  title,
  description,
  icon,
  active,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col rounded-2xl border p-6 text-left transition-all",
        active
          ? "border-green-500 bg-green-50"
          : "border-zinc-200 bg-white hover:border-green-300",
      )}
    >
      <div
        className={cn(
          "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl",
          active
            ? "bg-green-500 text-white"
            : "bg-zinc-100 text-zinc-600",
        )}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-zinc-500">
        {description}
      </p>
    </button>
  )
}
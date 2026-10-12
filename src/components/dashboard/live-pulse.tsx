"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export function LivePulse({
  className,
  intervalMs = 8000,
}: {
  className?: string
  intervalMs?: number
}) {
  const [count, setCount] = useState(7)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => 4 + ((c + 3) % 17))
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[11px] tracking-wide text-muted-foreground uppercase",
        className,
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-success opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-status-success" />
      </span>
      {count} new signals · last 2m
    </p>
  )
}

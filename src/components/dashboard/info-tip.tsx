"use client"

import { Info } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function InfoTip({
  content,
  label = "More information",
  className,
  side = "top",
}: {
  content: string
  label?: string
  className?: string
  side?: "top" | "bottom" | "left" | "right"
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className={cn(
          "inline-flex size-4 shrink-0 cursor-help items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground",
          className,
        )}
        aria-label={label}
      >
        <Info className="size-3.5" aria-hidden />
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className="max-w-[260px] px-3 py-2 text-left text-xs leading-relaxed whitespace-normal"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

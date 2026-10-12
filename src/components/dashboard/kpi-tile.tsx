"use client"

import { InfoTip } from "@/components/dashboard/info-tip"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function KpiTile({
  label,
  value,
  hint,
  tooltip,
  alert,
  className,
}: {
  label: string
  value: string
  hint?: string
  tooltip?: string
  alert?: boolean
  className?: string
}) {
  return (
    <Card
      className={cn(
        "shadow-none",
        alert ? "border-status-failed/40" : undefined,
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5">
          <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          {tooltip && <InfoTip content={tooltip} label={`About ${label}`} />}
        </div>
        <p
          className={cn(
            "mt-2 text-2xl font-semibold tracking-tight",
            alert ? "text-status-failed" : "text-foreground",
          )}
        >
          {value}
        </p>
        {hint && (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useMemo, useState } from "react"
import nigeria from "@svg-maps/nigeria"

import { InfoTip } from "@/components/dashboard/info-tip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { geoVolumes } from "@/lib/demo/insights"
import { cn } from "@/lib/utils"

type HeatKey = "Lagos" | "Abuja" | "Rivers" | "Kano" | "Nationwide"

/** Map demo region names → @svg-maps/nigeria location ids */
const HEAT_IDS: Record<Exclude<HeatKey, "Nationwide">, string> = {
  Lagos: "lagos",
  Abuja: "fct",
  Rivers: "rivers",
  Kano: "kano",
}

const ID_TO_HEAT = Object.fromEntries(
  Object.entries(HEAT_IDS).map(([k, v]) => [v, k as Exclude<HeatKey, "Nationwide">]),
) as Record<string, Exclude<HeatKey, "Nationwide">>

function heatOpacity(share: number, maxShare: number) {
  return 0.35 + Math.max(0.15, Math.min(1, share / maxShare)) * 0.65
}

export function NigeriaHeatMap({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<HeatKey | null>(null)

  const byRegion = useMemo(
    () => new Map(geoVolumes.map((g) => [g.region, g])),
    [],
  )

  const maxShare = Math.max(
    ...geoVolumes.filter((g) => g.region !== "Nationwide").map((g) => g.share),
  )

  const activeKey: HeatKey = hovered ?? "Lagos"
  const activeData =
    activeKey === "Nationwide"
      ? byRegion.get("Nationwide")
      : byRegion.get(activeKey)

  return (
    <Card className={cn("shadow-none", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
          Nigeria signal heat
          <InfoTip content="Administrative map of Nigeria. Lagos, FCT, Rivers and Kano are colored by signal share (darker red = hotter). Hover a state or the legend for volume." />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-border bg-neutral-200 p-3 dark:bg-neutral-950">
            <svg
              viewBox={nigeria.viewBox}
              className="mx-auto h-auto w-full max-h-[400px]"
              role="img"
              aria-label={nigeria.label}
            >
              {nigeria.locations.map((loc: { name: string; id: string; path: string }) => {
                const heatKey = ID_TO_HEAT[loc.id]
                const data = heatKey ? byRegion.get(heatKey) : undefined
                const isHot = !!data
                const isHovered =
                  (heatKey && hovered === heatKey) ||
                  (hovered === "Nationwide" && isHot)

                return (
                  <path
                    key={loc.id}
                    d={loc.path}
                    name={loc.name}
                    className={cn(
                      "transition-[fill,fill-opacity,stroke-width] duration-150",
                      isHot
                        ? "cursor-pointer stroke-neutral-700 dark:stroke-neutral-200"
                        : "pointer-events-none fill-neutral-300 stroke-neutral-500 dark:fill-neutral-700 dark:stroke-neutral-400",
                      isHovered && "!stroke-brand",
                    )}
                    fill={isHot ? "var(--brand)" : undefined}
                    fillOpacity={
                      isHot && data
                        ? isHovered
                          ? Math.min(1, heatOpacity(data.share, maxShare) + 0.12)
                          : heatOpacity(data.share, maxShare)
                        : hovered === "Nationwide"
                          ? 0.85
                          : 1
                    }
                    strokeWidth={isHovered ? 2 : 1.25}
                    strokeLinejoin="round"
                    onMouseEnter={() => heatKey && setHovered(heatKey)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => heatKey && setHovered(heatKey)}
                    onBlur={() => setHovered(null)}
                    tabIndex={isHot ? 0 : undefined}
                    role={isHot ? "button" : undefined}
                    aria-label={
                      isHot && data
                        ? `${loc.name}: ${data.volume} signals, ${data.share}%`
                        : loc.name
                    }
                  />
                )
              })}
            </svg>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="rounded-xl border border-border p-4">
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">
                {activeKey === "Abuja" ? "Abuja (FCT)" : activeKey}
              </p>
              {activeData && (
                <>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {activeData.volume}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    signals · {activeData.share}% of heat
                  </p>
                </>
              )}
            </div>

            <ul className="space-y-2">
              {geoVolumes.map((g) => {
                const isRegion = g.region !== "Nationwide"
                const intensity = isRegion ? g.share / maxShare : 0.35
                return (
                  <li key={g.region}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left text-xs transition-colors hover:bg-surface-field",
                        hovered === g.region && "border-border bg-surface-field",
                      )}
                      onMouseEnter={() => setHovered(g.region as HeatKey)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span
                        className="size-2.5 shrink-0 rounded-sm"
                        style={{
                          background: "var(--brand)",
                          opacity: 0.25 + intensity * 0.75,
                        }}
                      />
                      <span className="flex-1 font-medium">
                        {g.region === "Abuja" ? "Abuja (FCT)" : g.region}
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        {g.volume} · {g.share}%
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>Low</span>
              <div
                className="h-1.5 flex-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, color-mix(in oklab, var(--brand) 20%, transparent), var(--brand))",
                }}
              />
              <span>High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { reputationForecast } from "@/lib/demo/predictions"

export function ReputationChart({ height = 220 }: { height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={reputationForecast} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            domain={[60, 80]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid var(--border)",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="var(--brand)"
            fill="url(#scoreFill)"
            strokeWidth={2}
            name="Actual"
          />
          <Area
            type="monotone"
            dataKey="projected"
            stroke="var(--brand-mid)"
            strokeDasharray="4 4"
            fill="transparent"
            strokeWidth={2}
            name="Projected"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

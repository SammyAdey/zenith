"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { AgentStatusRow } from "@/components/dashboard/agent-status"
import { GenAISheetButton } from "@/components/dashboard/genai-sheet"
import { InfoTip } from "@/components/dashboard/info-tip"
import { KpiTile } from "@/components/dashboard/kpi-tile"
import { LivePulse } from "@/components/dashboard/live-pulse"
import { PageHeader } from "@/components/dashboard/page-header"
import { ReputationChart } from "@/components/dashboard/reputation-chart"
import { SignalDetailSheet } from "@/components/dashboard/signal-detail-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatReach, formatTime, sentimentClass } from "@/lib/demo/format"
import { peerShareOfVoice } from "@/lib/demo/insights"
import { brandHealth, sourceMix } from "@/lib/demo/predictions"
import { signals, themeClusters } from "@/lib/demo/signals"
import type { Signal } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

const funnel = [
  { label: "Awareness", value: brandHealth.awareness },
  { label: "Consideration", value: brandHealth.consideration },
  { label: "Advocacy", value: brandHealth.advocacy },
]

export function BrandView() {
  const crossSource = signals.slice(0, 8)
  const [selected, setSelected] = useState<Signal | null>(null)

  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        eyebrow="Unified sensing"
        title="Brand Intelligence Engine"
        description="One engine aggregating news, complaints, contact-centre data, surveys and digital signals into brand health."
        actions={
          <>
            <LivePulse className="hidden sm:inline-flex" />
            <GenAISheetButton
              type="executive_summary"
              label="Brand executive brief"
              variant="brand"
            />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiTile
          label="Brand health"
          value={String(brandHealth.score)}
          tooltip="Overall brand vitality (0–100) blending awareness, consideration, advocacy and complaint pressure."
        />
        <KpiTile
          label="Awareness"
          value={`${brandHealth.awareness}%`}
          tooltip="Share of relevant audience that recognises Zenith."
        />
        <KpiTile
          label="Consideration"
          value={`${brandHealth.consideration}%`}
          tooltip="Likelihood respondents would choose Zenith among peers."
        />
        <KpiTile
          label="Advocacy"
          value={`${brandHealth.advocacy}%`}
          tooltip="Willingness to recommend. CSR lifts this; unresolved complaints suppress it."
        />
        <KpiTile
          label="Complaint index"
          value={String(brandHealth.complaintIndex)}
          alert={brandHealth.complaintIndex > 20}
          tooltip="Normalised complaint intensity (lower is better). Above ~20 is elevated."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Brand funnel
              <InfoTip content="Awareness → Consideration → Advocacy. A wide top with a narrow middle usually means perception or service friction, not invisibility." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {funnel.map((step, i) => (
              <div key={step.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">
                    {i + 1}. {step.label}
                  </span>
                  <span className="text-muted-foreground">{step.value}%</span>
                </div>
                <Progress value={step.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Share of voice vs peers
              <InfoTip content="Relative mention share among Nigerian tier-1 banks (simulated). Pair with sentiment: high SOV with negative tilt is riskier than quiet positive share." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peerShareOfVoice} margin={{ left: 0, right: 8, top: 4 }}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: 12,
                    }}
                    formatter={(value) => [`${value}%`, "Share"]}
                  />
                  <Bar dataKey="share" fill="var(--brand)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              {peerShareOfVoice
                .filter((p) => p.name !== "Others")
                .map((p) => (
                  <li key={p.name}>
                    {p.name}: sentiment {p.sentiment > 0 ? "+" : ""}
                    {(p.sentiment * 100).toFixed(0)}
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Source mix
              <InfoTip content="Share of brand signals by channel. Contact-centre tilt usually means service issues." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceMix} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
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
                  <Bar dataKey="value" fill="var(--brand)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Reputation forecast
              <InfoTip content="Projected reputation trajectory from brand-wide signal mix." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReputationChart height={220} />
          </CardContent>
        </Card>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold tracking-tight">Cross-source theme map</h2>
            <InfoTip content="Click a theme to open Reputation Intelligence filtered to that narrative." />
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/reputation" />}
            variant="link"
            size="sm"
            className="gap-1"
          >
            Open Reputation
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {themeClusters.map((theme) => (
            <Link
              key={theme.id}
              href="/reputation"
              onClick={() => {
                try {
                  sessionStorage.setItem("zenith-theme-filter", theme.name)
                } catch {
                  /* ignore */
                }
              }}
              className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40 hover:bg-surface-field/50"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium tracking-tight">{theme.name}</p>
                <Badge className={cn("font-normal capitalize", sentimentClass(theme.sentiment))}>
                  {theme.sentiment}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{theme.description}</p>
              <p className="mt-3 text-[11px] tracking-wide text-muted-foreground uppercase">
                {theme.volume} signals · {theme.changePct > 0 ? "+" : ""}
                {theme.changePct}% · {theme.velocityPerHour}/h
              </p>
            </Link>
          ))}
        </div>
      </section>

      <AgentStatusRow
        title="Listening & monitoring agents"
        titleTooltip="Social Listening and Media Monitoring feed this engine; Crisis Detection highlights themes that may escalate."
        showTitle
      />

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
            Unified signal stream
            <InfoTip content="Click a signal for NLP detail. Use Related crises when negative high-reach items appear." />
          </CardTitle>
          <Button
            nativeButton={false}
            render={<Link href="/crisis" />}
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            Related crises
            <ArrowRight className="size-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {crossSource.map((signal) => (
            <button
              key={signal.id}
              type="button"
              onClick={() => setSelected(signal)}
              className="flex w-full flex-col gap-2 rounded-xl border border-border p-3 text-left transition-colors hover:bg-surface-field/50 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-normal capitalize">
                    {signal.channel.replace("_", " ")}
                  </Badge>
                  <Badge className={cn("font-normal capitalize", sentimentClass(signal.sentiment))}>
                    {signal.sentiment}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm font-medium tracking-tight">{signal.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {signal.excerpt}
                </p>
              </div>
              <div className="shrink-0 text-[11px] text-muted-foreground sm:text-right">
                <p>{signal.source}</p>
                <p>{formatTime(signal.timestamp)}</p>
                <p>Reach {formatReach(signal.reach)}</p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <SignalDetailSheet
        signal={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  )
}

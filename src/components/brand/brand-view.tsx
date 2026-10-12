"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
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
import { NigeriaHeatMap } from "@/components/dashboard/nigeria-heat-map"
import { PageHeader } from "@/components/dashboard/page-header"
import { ReputationChart } from "@/components/dashboard/reputation-chart"
import { EmotionBars, SentimentPie } from "@/components/dashboard/sentiment-chart"
import { SignalDetailSheet } from "@/components/dashboard/signal-detail-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatReach, formatTime, sentimentClass } from "@/lib/demo/format"
import { amplificationVelocity, peerShareOfVoice } from "@/lib/demo/insights"
import { brandHealth, sourceMix } from "@/lib/demo/predictions"
import {
  reputationScore,
  signals,
  themeClusters,
} from "@/lib/demo/signals"
import type { Channel, Sentiment, Signal } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

const channels: { value: Channel | "all"; label: string }[] = [
  { value: "all", label: "All channels" },
  { value: "social", label: "Social" },
  { value: "news", label: "News" },
  { value: "reviews", label: "Reviews" },
  { value: "contact_center", label: "Contact centre" },
  { value: "survey", label: "Surveys" },
  { value: "digital", label: "Digital" },
]

const sentiments: { value: Sentiment | "all"; label: string }[] = [
  { value: "all", label: "All sentiment" },
  { value: "positive", label: "Positive" },
  { value: "neutral", label: "Neutral" },
  { value: "negative", label: "Negative" },
]

const funnel = [
  { label: "Awareness", value: brandHealth.awareness },
  { label: "Consideration", value: brandHealth.consideration },
  { label: "Advocacy", value: brandHealth.advocacy },
]

export function BrandView() {
  const [channel, setChannel] = useState<Channel | "all">("all")
  const [sentiment, setSentiment] = useState<Sentiment | "all">("all")
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [selected, setSelected] = useState<Signal | null>(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("zenith-theme-filter")
      if (stored) {
        setActiveTheme(stored)
        sessionStorage.removeItem("zenith-theme-filter")
      }
    } catch {
      /* ignore */
    }
  }, [])

  const filtered = useMemo(() => {
    return signals.filter((s) => {
      if (channel !== "all" && s.channel !== channel) return false
      if (sentiment !== "all" && s.sentiment !== sentiment) return false
      if (activeTheme && s.theme !== activeTheme) return false
      return true
    })
  }, [channel, sentiment, activeTheme])

  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        eyebrow="Brand · Reputation"
        title="Brand Intelligence"
        description="Unified brand health, reputation sensing, NLP themes and live signals — news, social, complaints, surveys and digital in one workspace."
        actions={
          <>
            <LivePulse className="hidden sm:inline-flex" />
            <GenAISheetButton type="media_brief" label="Media brief" />
            <GenAISheetButton
              type="executive_summary"
              label="Brand brief"
              variant="brand"
            />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-8">
        <KpiTile
          label="Brand health"
          value={String(brandHealth.score)}
          tooltip="Overall brand vitality blending awareness, consideration, advocacy and complaints."
        />
        <KpiTile
          label="Reputation score"
          value={String(reputationScore.current)}
          tooltip="Composite 0–100 score from sentiment, volume, reach and source credibility."
        />
        <KpiTile
          label="Signals (24h)"
          value={String(signals.length * 38)}
          hint="Simulated volume"
          tooltip="Discrete mentions ingested in the last 24 hours across all channels."
        />
        <KpiTile
          label="Amplification"
          value={`${amplificationVelocity.currentPerHour}/h`}
          hint={`+${amplificationVelocity.changePct}% vs baseline`}
          alert={amplificationVelocity.changePct > 40}
          tooltip="Mentions per hour versus the 14-day baseline."
        />
        <KpiTile
          label="Awareness"
          value={`${brandHealth.awareness}%`}
          tooltip="Share of audience that recognises Zenith."
        />
        <KpiTile
          label="Consideration"
          value={`${brandHealth.consideration}%`}
          tooltip="Likelihood to choose Zenith among peers."
        />
        <KpiTile
          label="Advocacy"
          value={`${brandHealth.advocacy}%`}
          tooltip="Willingness to recommend."
        />
        <KpiTile
          label="Negative share"
          value="23%"
          hint="Above baseline"
          alert
          tooltip="Share of signals classified as negative versus the 14-day baseline."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Brand funnel
              <InfoTip content="Awareness → Consideration → Advocacy. A wide top with a narrow middle usually means perception or service friction." />
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
              <InfoTip content="Relative mention share across banks, top fintechs and MTN. For deeper peer analysis open Competitor Analysis." />
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
            <Button
              nativeButton={false}
              render={<Link href="/competitors" />}
              variant="link"
              size="sm"
              className="mt-1 gap-1 px-0"
            >
              Open Competitor Analysis
              <ArrowRight className="size-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Source mix
              <InfoTip content="Share of brand signals by channel." />
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

      <NigeriaHeatMap />

      <div className="flex flex-wrap gap-2">
        <Select
          value={channel}
          onValueChange={(v) => setChannel((v ?? "all") as Channel | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {channels.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sentiment}
          onValueChange={(v) => setSentiment((v ?? "all") as Sentiment | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sentiments.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {activeTheme && (
          <Button size="sm" variant="outline" onClick={() => setActiveTheme(null)}>
            Clear theme: {activeTheme}
          </Button>
        )}
      </div>

      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <h2 className="text-sm font-semibold tracking-tight">
            Trending topics and themes clustering
          </h2>
          <InfoTip content="Click a theme to filter the live feed below. Volume is signal count; velocity/h shows amplification vs baseline." />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {themeClusters.map((theme) => {
            const selectedTheme = activeTheme === theme.name
            const velocityUp = theme.velocityPerHour > theme.velocityBaseline
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveTheme(selectedTheme ? null : theme.name)}
                className={cn(
                  "rounded-xl border bg-card p-4 text-left transition-colors hover:bg-surface-field/60",
                  selectedTheme
                    ? "border-brand ring-1 ring-brand/30"
                    : "border-border",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium tracking-tight">{theme.name}</p>
                  <Badge className={cn("font-normal capitalize", sentimentClass(theme.sentiment))}>
                    {theme.sentiment}
                  </Badge>
                </div>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{theme.volume}</p>
                <p className="text-[11px] text-muted-foreground">
                  Volume · {theme.changePct > 0 ? "+" : ""}
                  {theme.changePct}% WoW ·{" "}
                  <span className={velocityUp ? "text-status-warning" : undefined}>
                    {theme.velocityPerHour}/h
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{theme.description}</p>
              </button>
            )
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Live signal feed
              <InfoTip content="Click any signal for NLP detail. Badges show sentiment, emotion and topic." />
            </CardTitle>
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              Related crises
              <ArrowRight className="size-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-surface-field/60 px-6 py-12 text-center">
                <p className="text-sm font-medium">No signals match</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Adjust channel, sentiment or theme filters.
                </p>
              </div>
            )}
            {filtered.map((signal) => (
              <button
                key={signal.id}
                type="button"
                onClick={() => setSelected(signal)}
                className="w-full rounded-xl border border-border p-4 text-left transition-colors hover:bg-surface-field/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={cn("font-normal capitalize", sentimentClass(signal.sentiment))}>
                    {signal.sentiment}
                  </Badge>
                  <Badge variant="outline" className="font-normal capitalize">
                    {signal.emotion}
                  </Badge>
                  <Badge variant="secondary" className="font-normal">
                    {signal.topic}
                  </Badge>
                </div>
                <h3 className="mt-2 text-sm font-medium tracking-tight">{signal.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {signal.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span>{signal.source}</span>
                  <span>{formatTime(signal.timestamp)}</span>
                  <span>Reach {formatReach(signal.reach)}</span>
                  <span className="text-brand">{signal.theme}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                Sentiment mix
                <InfoTip content="Distribution by polarity for the current filters." />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentPie />
              <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground">
                {["Positive", "Neutral", "Negative"].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                Emotion detection
                <InfoTip content="Finer-grained NLP beyond polarity. Tall anger/fear bars often warrant Crisis Command Centre attention." />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmotionBars />
            </CardContent>
          </Card>
        </div>
      </div>

      <AgentStatusRow
        title="Listening & monitoring agents"
        titleTooltip="Social Listening and Media Monitoring feed this workspace; Crisis Detection flags escalating themes."
        showTitle
      />

      <SignalDetailSheet
        signal={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  )
}

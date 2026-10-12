"use client"

import { useEffect, useMemo, useState } from "react"

import { GenAISheetButton } from "@/components/dashboard/genai-sheet"
import { InfoTip } from "@/components/dashboard/info-tip"
import { KpiTile } from "@/components/dashboard/kpi-tile"
import { LivePulse } from "@/components/dashboard/live-pulse"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmotionBars, SentimentPie } from "@/components/dashboard/sentiment-chart"
import { SignalDetailSheet } from "@/components/dashboard/signal-detail-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NigeriaHeatMap } from "@/components/dashboard/nigeria-heat-map"
import { amplificationVelocity } from "@/lib/demo/insights"
import { formatReach, formatTime, sentimentClass } from "@/lib/demo/format"
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

export function ReputationView() {
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
        eyebrow="NLP Engine"
        title="Reputation Intelligence"
        description="Real-time media, social and stakeholder sentiment sensing with emotion, topic classification and theme clustering."
        actions={
          <>
            <LivePulse className="hidden sm:inline-flex" />
            <GenAISheetButton type="media_brief" label="Generate media brief" variant="brand" />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiTile
          label="Reputation score"
          value={String(reputationScore.current)}
          tooltip="Composite 0–100 score from weighted sentiment, volume, reach and source credibility. Higher is healthier. Moves of ±3+ points in a day usually signal a material narrative shift."
        />
        <KpiTile
          label="Signals (24h)"
          value={String(signals.length * 38)}
          hint="Simulated volume"
          tooltip="Count of media, social, review, survey and contact-centre items ingested in the last 24 hours."
        />
        <KpiTile
          label="Amplification velocity"
          value={`${amplificationVelocity.currentPerHour}/h`}
          hint={`+${amplificationVelocity.changePct}% vs baseline`}
          alert={amplificationVelocity.changePct > 40}
          tooltip="Mentions per hour versus the 14-day baseline. Rising velocity with negative sentiment is an early crisis signal—more predictive than raw volume."
        />
        <KpiTile
          label="Themes tracked"
          value={String(themeClusters.length)}
          tooltip="Number of active narrative clusters. Click a theme card below to filter the live feed."
        />
        <KpiTile
          label="Negative share"
          value="23%"
          hint="Above 14-day baseline"
          alert
          tooltip="Share of signals classified as negative. Compare to the 14-day baseline: rising share with high reach is an early stress signal."
        />
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTheme(null)}
          >
            Clear theme: {activeTheme}
          </Button>
        )}
      </div>

      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <h2 className="text-sm font-semibold tracking-tight">Theme clustering</h2>
          <InfoTip content="Click a theme to filter the live feed. Volume is signal count; velocity/h shows amplification vs baseline. Rising volume + negative sentiment is priority." />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {themeClusters.map((theme) => {
            const selectedTheme = activeTheme === theme.name
            const velocityUp = theme.velocityPerHour > theme.velocityBaseline
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() =>
                  setActiveTheme(selectedTheme ? null : theme.name)
                }
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
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Live signal feed
              <InfoTip content="Click any signal for NLP detail. Badges show sentiment, emotion and topic. Red theme tags link to clusters above." />
            </CardTitle>
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
                <InfoTip content="Distribution by polarity for the current filters. Green = positive, grey = neutral, red = negative." />
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
                <InfoTip content="Finer-grained NLP beyond polarity. Tall anger/fear bars with rising velocity often warrant Crisis Centre attention." />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmotionBars />
            </CardContent>
          </Card>
        </div>
      </div>

      <SignalDetailSheet
        signal={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  )
}

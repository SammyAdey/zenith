"use client"

import { useMemo, useState } from "react"
import { Sparkles } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { GenAISheetButton } from "@/components/dashboard/genai-sheet"
import { InfoTip } from "@/components/dashboard/info-tip"
import { KpiTile } from "@/components/dashboard/kpi-tile"
import { PageHeader } from "@/components/dashboard/page-header"
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
import {
  competitiveBrief,
  competitiveThemes,
  competitors,
  headToHeadNarratives,
  perceptionAttributes,
  sentimentTrend,
  type CompetitorId,
} from "@/lib/demo/competitors"
import { cn } from "@/lib/utils"

export function CompetitorsView() {
  const [peerId, setPeerId] = useState<Exclude<CompetitorId, "zenith">>("gtco")

  const zenith = competitors.find((c) => c.id === "zenith")!
  const peer = competitors.find((c) => c.id === peerId)!
  const peers = competitors.filter((c) => c.id !== "zenith")

  const headToHead = useMemo(
    () =>
      headToHeadNarratives.find((h) => h.competitor === peer.short) ??
      headToHeadNarratives[0],
    [peer.short],
  )

  const sovData = competitors.map((c) => ({
    name: c.short,
    share: c.shareOfVoice,
    fill: c.color,
  }))

  const scoreData = competitors.map((c) => ({
    name: c.short,
    score: c.reputationScore,
    fill: c.color,
  }))

  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        eyebrow="Competitive intelligence"
        title="Competitor Analysis"
        description="How the public views Zenith versus tier-1 banks, top fintechs (OPay, Moniepoint, PalmPay) and MTN — share of voice, sentiment, perception and theme ownership."
        actions={
          <GenAISheetButton
            type="competitive_brief"
            label="Competitive brief"
            variant="brand"
          />
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile
          label="Zenith SOV"
          value={`${zenith.shareOfVoice}%`}
          hint="Leads deposit banks in set"
          tooltip="Share of conversation mentioning Zenith versus banks, OPay, Moniepoint, PalmPay and MTN."
        />
        <KpiTile
          label="Reputation vs leader"
          value={`${zenith.reputationScore} / ${Math.max(...competitors.map((c) => c.reputationScore))}`}
          hint="Zenith vs best peer (GTCO)"
          tooltip="Zenith’s reputation score compared to the current peer leader across banks, fintechs and MTN."
        />
        <KpiTile
          label="Net sentiment"
          value={`${zenith.netSentiment > 0 ? "+" : ""}${zenith.netSentiment}`}
          hint="Ahead of Access, PalmPay & MTN"
          tooltip="Net positive minus negative mention share for Zenith. Compare the trend chart below to see peer trajectories."
        />
        <KpiTile
          label="Owned themes"
          value="2"
          hint="CSR + earnings narrative"
          tooltip="Count of competitive themes where Zenith ranks #1. Fintechs currently lead payments and wallet themes."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Share of voice
              <InfoTip content="Relative mention share across banks, fintechs and MTN (simulated). High SOV with soft sentiment is a risk; high SOV with positive themes is an advantage." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sovData} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-28}
                    textAnchor="end"
                    height={56}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: 12,
                    }}
                    formatter={(value) => [`${value}%`, "SOV"]}
                  />
                  <Bar dataKey="share" radius={[4, 4, 0, 0]}>
                    {sovData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Reputation score comparison
              <InfoTip content="Composite reputation scores across banks, fintechs and MTN. Zenith leads deposit-bank SOV but trails GTCO slightly on score; Moniepoint is close on fintech reputation." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-28}
                    textAnchor="end"
                    height={56}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis domain={[50, 85]} hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {scoreData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
            Net sentiment trend (7 days)
            <InfoTip content="Daily net sentiment across banks, fintechs and MTN. Fintechs stay positive on wallets/agents; MTN dips with USSD/fraud adjacency; Zenith softens on payments friction." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrend} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
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
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="Zenith" stroke="#ed1c24" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="GTCO" stroke="#f15a22" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Access" stroke="#ef7d00" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="FirstBank" stroke="#0033a0" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="OPay" stroke="#00a651" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Moniepoint" stroke="#0b1f3a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="PalmPay" stroke="#6c2bd9" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="MTN" stroke="#ffcc00" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold tracking-tight">Head-to-head perception</h2>
            <InfoTip content="Pick a peer to compare attribute scores and how the public frames both brands." />
          </div>
          <Select
            value={peerId}
            onValueChange={(v) => setPeerId((v ?? "gtco") as Exclude<CompetitorId, "zenith">)}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {peers.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  vs {p.name}
                  {p.segment === "fintech"
                    ? " · Fintech"
                    : p.segment === "telco"
                      ? " · Telco"
                      : " · Bank"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold tracking-tight">
                Zenith vs {peer.short} — attributes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {perceptionAttributes.map((attr) => {
                const z = zenith[attr.key]
                const p = peer[attr.key]
                return (
                  <div key={attr.key}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium">{attr.label}</span>
                      <span className="text-muted-foreground">
                        <span className="text-brand">{z}</span>
                        {" / "}
                        <span>{p}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={z} className="h-2" />
                      <Progress value={p} className="h-2 opacity-70" />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                      <span>Zenith</span>
                      <span>{peer.short}</span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold tracking-tight">
                How people frame both brands
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border bg-surface-field p-4">
                <p className="text-[10px] tracking-wide text-brand uppercase">Public view</p>
                <p className="mt-2 text-sm leading-relaxed">{headToHead.publicView}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-status-success">Zenith advantage</p>
                <p className="mt-1 text-sm text-muted-foreground">{headToHead.zenithAdvantage}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-status-warning">{peer.short} advantage</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {headToHead.competitorAdvantage}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="secondary" className="font-normal">
                  Mentions 24h: Zenith {zenith.mentionVolume24h.toLocaleString()}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {peer.short} {peer.mentionVolume24h.toLocaleString()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <h2 className="text-sm font-semibold tracking-tight">Theme ownership</h2>
          <InfoTip content="Which bank currently leads public conversation on each theme, and where Zenith ranks." />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {competitiveThemes.map((t) => (
            <Card key={t.theme} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium tracking-tight">{t.theme}</p>
                  <Badge
                    className={cn(
                      "font-normal",
                      t.leader === "Zenith"
                        ? "bg-brand/15 text-brand"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    #{t.zenithRank} Zenith
                  </Badge>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Leader: <span className="font-medium text-foreground">{t.leader}</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.insight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
            <Sparkles className="size-4 text-brand" />
            {competitiveBrief.title}
            <InfoTip content="Simulated GenAI competitive summary for leadership walkthroughs." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{competitiveBrief.body}</p>
          <ul className="mt-4 space-y-2 rounded-xl border border-border bg-surface-field p-4">
            {competitiveBrief.bullets.map((b) => (
              <li key={b} className="text-sm">
                <span className="mr-2 text-brand">•</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {competitors.map((c) => (
              <Button
                key={c.id}
                size="sm"
                variant={c.id === "zenith" ? "brand" : "outline"}
                className="pointer-events-none"
              >
                {c.short} {c.weekChange > 0 ? `+${c.weekChange}` : c.weekChange} pts WoW
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

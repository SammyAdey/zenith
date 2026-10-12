"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Check, UserPlus, Zap } from "lucide-react"

import { GenAISheetButton } from "@/components/dashboard/genai-sheet"
import { InfoTip } from "@/components/dashboard/info-tip"
import { KpiTile } from "@/components/dashboard/kpi-tile"
import { PageHeader } from "@/components/dashboard/page-header"
import { ReputationChart } from "@/components/dashboard/reputation-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { agentEvents, agents } from "@/lib/demo/agents"
import { formatTime, severityClass } from "@/lib/demo/format"
import { narrativeStages, narrativeState } from "@/lib/demo/insights"
import {
  crisisAlerts as initialAlerts,
  riskPrediction as initialRisk,
  scenarios,
} from "@/lib/demo/predictions"
import type { CrisisAlert, NarrativeStage } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

const assignees = ["Comms Lead", "Ops Bridge", "IR Desk"] as const

export function CrisisView() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id)
  const [alerts, setAlerts] = useState<CrisisAlert[]>(initialAlerts)
  const [escalation, setEscalation] = useState(initialRisk.escalationLikelihood)
  const [riskIndex, setRiskIndex] = useState(initialRisk.overallRisk)
  const [stage, setStage] = useState<NarrativeStage>(narrativeState.stage)
  const [approved, setApproved] = useState<Record<string, boolean>>({})
  const [timelineExtra, setTimelineExtra] = useState<
    { id: string; time: string; message: string; severity: "info" | "warning" | "critical" }[]
  >([])
  const [spiking, setSpiking] = useState(false)

  const scenario = scenarios.find((s) => s.id === activeScenario) ?? scenarios[0]
  const crisisAgent = agents.find((a) => a.id === "agent-crisis")
  const openCount = alerts.filter((a) => a.status !== "contained").length

  const stageIndex = narrativeStages.findIndex((s) => s.id === stage)

  const timeline = useMemo(() => {
    const base = agentEvents.map((ev) => ({
      id: ev.id,
      time: ev.time,
      message: ev.message,
      severity: ev.severity,
      agentId: ev.agentId,
    }))
    return [...timelineExtra.map((e) => ({ ...e, agentId: "agent-crisis" })), ...base]
  }, [timelineExtra])

  async function simulateSpike() {
    setSpiking(true)
    await new Promise((r) => setTimeout(r, 900))
    setEscalation((e) => Math.min(92, e + 14))
    setRiskIndex((r) => Math.min(85, r + 11))
    setStage("crisis")
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === "alert-1"
          ? {
              ...a,
              escalationLikelihood: Math.min(95, a.escalationLikelihood + 14),
              mediaPickupProbability: Math.min(90, a.mediaPickupProbability + 18),
              status: "escalating",
              responseSlaMinutes: Math.max(15, a.responseSlaMinutes - 40),
            }
          : a,
      ),
    )
    setTimelineExtra((t) => [
      {
        id: `spike-${Date.now()}`,
        time: new Date().toLocaleTimeString("en-NG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message:
          "Simulated spike: payments velocity +62% in 15m. Narrative stage elevated to Crisis. Media pickup probability recalculated.",
        severity: "critical",
      },
      ...t,
    ])
    setSpiking(false)
  }

  function acknowledge(id: string) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "acknowledged", assignee: a.assignee ?? "Comms Lead" } : a,
      ),
    )
  }

  function assign(id: string) {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        const next =
          assignees[(assignees.indexOf((a.assignee as (typeof assignees)[number]) ?? "Comms Lead") + 1) % assignees.length]
        return { ...a, assignee: next, status: a.status === "watching" ? "acknowledged" : a.status }
      }),
    )
  }

  function startScenario(theme: string) {
    const match = scenarios.find((s) =>
      theme.toLowerCase().includes("payment")
        ? s.id === "sc-1"
        : s.id === "sc-2",
    )
    if (match) setActiveScenario(match.id)
  }

  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        eyebrow="Predictive · Agentic"
        title="Crisis Command Centre"
        description="Early-warning signals, escalation likelihood, scenario response planning and coordinated messaging."
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              disabled={spiking}
              onClick={() => void simulateSpike()}
            >
              <Zap className="size-3.5" />
              {spiking ? "Simulating…" : "Simulate spike"}
            </Button>
            <GenAISheetButton type="recommended_actions" label="Recommended actions" />
            <GenAISheetButton
              type="situation_report"
              label="Situation report"
              variant="brand"
            />
          </>
        }
      />

      <Card className="shadow-none border-brand/30 bg-brand-soft/40">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] tracking-widest text-brand uppercase">Narrative stage</p>
              <InfoTip content="Industry pattern: Calm → Concern → Incident → Crisis. Stage advances with velocity, corroboration and media-pickup risk—not volume alone." />
            </div>
            <p className="mt-1 text-lg font-semibold tracking-tight">
              {narrativeStages.find((s) => s.id === stage)?.label}
            </p>
            <p className="mt-1 max-w-xl text-xs text-muted-foreground">
              {stage === "crisis"
                ? "Simulated elevation: treat as full protocol. Approve holding statements and brief Contact Centre now."
                : narrativeState.summary}
            </p>
          </div>
          <ol className="flex flex-wrap gap-2">
            {narrativeStages.map((s, i) => (
              <li
                key={s.id}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase",
                  i <= stageIndex
                    ? "bg-brand text-white"
                    : "bg-surface-field text-muted-foreground",
                )}
              >
                {s.label}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile
          label="Escalation likelihood"
          value={`${escalation}%`}
          alert={escalation >= 50}
          tooltip="Probability the lead risk cluster expands into broader media or regulatory attention within ~48 hours."
        />
        <KpiTile
          label="Risk index"
          value={String(riskIndex)}
          tooltip="Blended 0–100 operational and reputational pressure score."
        />
        <KpiTile
          label="Open incidents"
          value={String(openCount)}
          tooltip="Alerts still watching, escalating or acknowledged—not contained."
        />
        <KpiTile
          label="Crisis agent"
          value={crisisAgent?.status === "alerting" || stage === "crisis" ? "Alerting" : "Active"}
          hint={crisisAgent?.lastAction}
          tooltip="Live state of the Crisis Detection Agent."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="shadow-none border-status-failed/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Early-warning alerts · War room
              <InfoTip content="Acknowledge ownership, assign a desk, and start the matching scenario. Media pickup % estimates broadcast/press risk; SLA is minutes remaining for first response." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-xl border border-border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={cn("font-normal capitalize", severityClass(alert.severity))}>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline" className="font-normal capitalize">
                    {alert.status}
                  </Badge>
                  {alert.assignee && (
                    <Badge variant="secondary" className="font-normal">
                      {alert.assignee}
                    </Badge>
                  )}
                </div>
                <h3 className="mt-2 text-sm font-medium tracking-tight">{alert.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{alert.summary}</p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                      <span>Escalation</span>
                      <span className="font-medium text-brand">
                        {alert.escalationLikelihood}%
                      </span>
                    </div>
                    <Progress value={alert.escalationLikelihood} className="h-1.5" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                      <span>Media pickup</span>
                      <span className="font-medium text-foreground">
                        {alert.mediaPickupProbability}%
                      </span>
                    </div>
                    <Progress value={alert.mediaPickupProbability} className="h-1.5" />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] text-muted-foreground">
                    Detected {formatTime(alert.detectedAt)} · {alert.sources.join(", ")}
                    {alert.responseSlaMinutes > 0 && (
                      <> · SLA {alert.responseSlaMinutes}m left</>
                    )}
                  </p>
                  <Button
                    nativeButton={false}
                    render={
                      <Link
                        href="/brand-intelligence"
                        onClick={() => {
                          try {
                            sessionStorage.setItem("zenith-theme-filter", alert.theme)
                          } catch {
                            /* ignore */
                          }
                        }}
                      />
                    }
                    variant="link"
                    size="sm"
                    className="h-auto px-0"
                  >
                    Theme: {alert.theme}
                  </Button>
                </div>

                {alert.status !== "contained" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => acknowledge(alert.id)}>
                      <Check className="size-3.5" />
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => assign(alert.id)}>
                      <UserPlus className="size-3.5" />
                      Assign
                    </Button>
                    <Button
                      size="sm"
                      variant="brand"
                      onClick={() => startScenario(alert.theme)}
                    >
                      Start scenario
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                Risk drivers
                <InfoTip content="Relative weight of themes feeding the risk index. Tackle the largest bars first." />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {initialRisk.drivers.map((d) => (
                <div key={d.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{d.label}</span>
                    <span className="text-muted-foreground">{d.weight}%</span>
                  </div>
                  <Progress value={d.weight} className="h-1.5" />
                </div>
              ))}
              <p className="pt-2 text-xs text-muted-foreground">
                {initialRisk.trendProjection}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                Trend projection
                <InfoTip content="Forward path of reputation score under current risk. Mitigate before the dashed forecast dips below tolerance." />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReputationChart height={180} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
            Crisis Detection Agent timeline
            <InfoTip content="Chronological detections. New spike simulations appear at the top." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {timeline.map((ev) => {
              const agent = agents.find((a) => a.id === ev.agentId)
              return (
                <li key={ev.id} className="flex gap-3">
                  <span className="w-12 shrink-0 text-[11px] font-medium text-muted-foreground tabular-nums">
                    {ev.time}
                  </span>
                  <div className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={cn("font-normal capitalize", severityClass(ev.severity))}>
                        {ev.severity}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {agent?.name ?? "Crisis Detection Agent"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">{ev.message}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </CardContent>
      </Card>

      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <h2 className="text-sm font-semibold tracking-tight">
            Scenario response & message coordination
          </h2>
          <InfoTip content="Approve drafts per audience before channel publish. Approval is simulated for the demo walkthrough." />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <Button
              key={s.id}
              size="sm"
              variant={activeScenario === s.id ? "brand" : "outline"}
              onClick={() => setActiveScenario(s.id)}
            >
              {s.name}
            </Button>
          ))}
        </div>
        <Card className="shadow-none">
          <CardContent className="space-y-4 p-5">
            <div>
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Trigger
              </p>
              <p className="mt-1 text-sm">{scenario.trigger}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Recommended actions
              </p>
              <ul className="mt-2 space-y-1.5">
                {scenario.recommendedActions.map((a) => (
                  <li key={a} className="text-sm">
                    <span className="mr-2 text-brand">•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <Tabs defaultValue={scenario.draftMessages[0]?.audience}>
              <TabsList>
                {scenario.draftMessages.map((m) => (
                  <TabsTrigger key={m.audience} value={m.audience}>
                    {m.audience}
                    {approved[`${scenario.id}-${m.audience}`] && (
                      <Check className="size-3 text-status-success" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              {scenario.draftMessages.map((m) => {
                const key = `${scenario.id}-${m.audience}`
                const isApproved = !!approved[key]
                return (
                  <TabsContent key={m.audience} value={m.audience}>
                    <div className="space-y-3">
                      <div className="rounded-xl border border-border bg-surface-field p-4 text-sm leading-relaxed">
                        {m.message}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={isApproved ? "outline" : "brand"}
                          disabled={isApproved}
                          onClick={() =>
                            setApproved((prev) => ({ ...prev, [key]: true }))
                          }
                        >
                          <Check className="size-3.5" />
                          {isApproved ? "Approved for channel" : "Approve draft"}
                        </Button>
                        {isApproved && (
                          <span className="text-xs text-status-success">
                            Ready for {m.audience.toLowerCase()} channel
                          </span>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

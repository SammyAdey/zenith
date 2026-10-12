import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AgentStatusRow } from "@/components/dashboard/agent-status"
import { GenAISheetButton } from "@/components/dashboard/genai-sheet"
import { InfoTip } from "@/components/dashboard/info-tip"
import { KpiTile } from "@/components/dashboard/kpi-tile"
import { PageHeader } from "@/components/dashboard/page-header"
import { ReputationChart } from "@/components/dashboard/reputation-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { severityClass } from "@/lib/demo/format"
import { crisisAlerts, riskPrediction } from "@/lib/demo/predictions"
import { reputationScore } from "@/lib/demo/signals"
import { cn } from "@/lib/utils"

export default function CommandCentrePage() {
  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        eyebrow="Overview"
        title="Command Centre"
        description="A connected intelligence layer turns dispersed signals into timely insight, tailored engagement and coordinated action."
        actions={
          <>
            <GenAISheetButton type="situation_report" label="Situation report" />
            <GenAISheetButton
              type="executive_summary"
              label="Executive summary"
              variant="brand"
            />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile
          label="Reputation score"
          value={String(reputationScore.current)}
          hint={`${reputationScore.current - reputationScore.previous} vs last week · ${reputationScore.label}`}
          tooltip="Composite 0–100 health score from sentiment, volume, reach and source weight. Compare to last week: sustained drops of 3+ points usually mean a narrative is taking hold."
        />
        <KpiTile
          label="Escalation likelihood"
          value={`${riskPrediction.escalationLikelihood}%`}
          hint="Payments friction cluster"
          alert={riskPrediction.escalationLikelihood >= 50}
          tooltip="Modelled probability the top risk cluster spills into wider media or regulatory attention within ~48 hours. Above 50% typically triggers Crisis Centre playbooks."
        />
        <KpiTile
          label="Active alerts"
          value={String(crisisAlerts.filter((a) => a.status !== "contained").length)}
          hint="Across media, social & contact centre"
          tooltip="Count of open early-warning items that are watching or escalating—not yet contained. Each alert has its own severity and escalation score in Crisis Command Centre."
        />
        <KpiTile
          label="Overall risk index"
          value={String(riskPrediction.overallRisk)}
          hint={riskPrediction.trendProjection.slice(0, 48) + "…"}
          tooltip="Blended operational and reputational risk (0–100) across drivers like payments friction, rumours and branch complaints. Higher means more downside pressure on the reputation score."
        />
      </div>

      <section className="rounded-2xl border border-status-failed/30 bg-status-failed/5 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold text-status-failed">Active alerts</h2>
            <InfoTip content="Priority incidents needing attention now. Severity (high/medium/low) is impact if ignored; % escalate is the chance it widens in ~48h. Open Crisis Centre for playbooks." />
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/crisis" />}
            variant="outline"
            size="sm"
            className="gap-1.5 bg-card"
          >
            Open Crisis Centre
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
        <ul className="mt-4 space-y-3">
          {crisisAlerts.slice(0, 2).map((alert) => (
            <li
              key={alert.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={cn("font-normal capitalize", severityClass(alert.severity))}>
                    {alert.severity}
                  </Badge>
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{alert.summary}</p>
              </div>
              <p className="shrink-0 text-xs font-medium text-brand">
                {alert.escalationLikelihood}% escalate
              </p>
            </li>
          ))}
        </ul>
      </section>

      <AgentStatusRow />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Reputation forecast
              <InfoTip content="Solid line = observed daily score. Dashed line = predictive path if current risk drivers continue unmitigated. A widening gap below the solid line is your early warning window." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReputationChart />
            <p className="mt-2 text-xs text-muted-foreground">
              Solid = observed · Dashed = predictive projection
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              Deep modules
              <InfoTip content="Shortcuts into the three fully interactive workspaces. Use Reputation for NLP detail, Crisis for response coordination, and Brand for cross-source health." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              {
                href: "/reputation",
                title: "Reputation Intelligence",
                desc: "NLP sentiment, emotion, topics & themes",
              },
              {
                href: "/crisis",
                title: "Crisis Command Centre",
                desc: "Early warning, scenarios & message coordination",
              },
              {
                href: "/brand-intelligence",
                title: "Brand Intelligence Engine",
                desc: "Unified news, complaints, surveys & digital",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3 transition-colors hover:bg-surface-field"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium tracking-tight">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-brand" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

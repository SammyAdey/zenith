"use client"

import { useState } from "react"
import { Play } from "lucide-react"

import { InfoTip } from "@/components/dashboard/info-tip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { agents as seedAgents } from "@/lib/demo/agents"
import type { Agent } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

const statusStyles = {
  active: "bg-status-success/15 text-status-success",
  idle: "bg-status-queued/15 text-status-queued",
  alerting: "bg-status-warning/15 text-status-warning",
} as const

const agentTips: Record<string, string> = {
  "agent-social":
    "Watches social platforms for Zenith mentions. Run now simulates a fresh ingest cycle.",
  "agent-media":
    "Monitors newsrooms and broadcast. Use Last action to see the newest editorial frame.",
  "agent-crisis":
    "Scores escalation risk across themes. Alerting means a playbook threshold was crossed.",
}

const runMessages: Record<string, string> = {
  "agent-social": "Re-clustered Lagos payments chatter · +28 posts since last run",
  "agent-media": "Synced morning monitors · no new TV crisis framing",
  "agent-crisis": "Re-scored escalation · payments cluster still above threshold",
}

export function AgentStatusRow({
  title = "Agentic AI",
  titleTooltip = "Autonomous agents that continuously listen, classify and escalate. Hover each card for how to read its status.",
  showTitle = true,
}: {
  title?: string
  titleTooltip?: string
  showTitle?: boolean
} = {}) {
  const [agents, setAgents] = useState<Agent[]>(seedAgents)
  const [runningId, setRunningId] = useState<string | null>(null)

  async function runAgent(id: string) {
    setRunningId(id)
    await new Promise((r) => setTimeout(r, 900))
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              lastAction: runMessages[id] ?? a.lastAction,
              signalsProcessed: a.signalsProcessed + 12 + Math.floor(Math.random() * 20),
              status: a.id === "agent-crisis" ? "alerting" : "active",
            }
          : a,
      ),
    )
    setRunningId(null)
  }

  return (
    <div>
      {showTitle && (
        <div className="mb-3 flex items-center gap-1.5">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          <InfoTip content={titleTooltip} />
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-3">
        {agents.map((agent, i) => (
          <Card
            key={agent.id}
            className={cn(
              "shadow-none animate-fade-up",
              i === 0 && "animate-fade-up-delay-1",
              i === 1 && "animate-fade-up-delay-2",
              i === 2 && "animate-fade-up-delay-3",
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                  {agent.name}
                  <InfoTip content={agentTips[agent.id] ?? agent.role} />
                </CardTitle>
                <Badge className={cn("font-normal capitalize", statusStyles[agent.status])}>
                  {agent.status === "alerting" && (
                    <span className="size-1.5 animate-pulse rounded-full bg-status-warning" />
                  )}
                  {agent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">{agent.role}</p>
              <p className="text-xs text-foreground">
                <span className="text-muted-foreground">Last: </span>
                {agent.lastAction}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                  {agent.signalsProcessed.toLocaleString()} signals
                </p>
                <Button
                  size="xs"
                  variant="outline"
                  className="gap-1"
                  disabled={runningId === agent.id}
                  onClick={() => void runAgent(agent.id)}
                >
                  <Play className="size-3 fill-current" />
                  {runningId === agent.id ? "Running…" : "Run now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

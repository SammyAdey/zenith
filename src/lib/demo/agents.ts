import type { Agent, AgentEvent } from "./types"

export const agents: Agent[] = [
  {
    id: "agent-social",
    name: "Social Listening Agent",
    role: "Monitors X, Instagram, forums, and influencer threads across Nigeria.",
    status: "active",
    lastAction: "Clustered 128 posts on USSD recovery narrative",
    signalsProcessed: 1842,
  },
  {
    id: "agent-media",
    name: "Media Monitoring Agent",
    role: "Tracks print, TV, and digital newsrooms for Zenith and peer banks.",
    status: "active",
    lastAction: "Flagged BusinessDay FX liquidity commentary",
    signalsProcessed: 614,
  },
  {
    id: "agent-crisis",
    name: "Crisis Detection Agent",
    role: "Scores escalation likelihood and proposes scenario responses.",
    status: "alerting",
    lastAction: "Raised medium alert on payments friction cluster",
    signalsProcessed: 221,
  },
]

export const agentEvents: AgentEvent[] = [
  {
    id: "ev-1",
    agentId: "agent-crisis",
    time: "08:42",
    message: "Escalation likelihood for POS decline cluster moved 41% → 58%.",
    severity: "warning",
  },
  {
    id: "ev-2",
    agentId: "agent-social",
    time: "08:31",
    message: "Detected rumour spike on app outage; authenticity score 0.22 (low).",
    severity: "warning",
  },
  {
    id: "ev-3",
    agentId: "agent-media",
    time: "08:18",
    message: "Ingested Punch SME academy piece — positive brand equity lift.",
    severity: "info",
  },
  {
    id: "ev-4",
    agentId: "agent-crisis",
    time: "07:55",
    message: "Prepared draft holding statement for cards & payments scenario.",
    severity: "info",
  },
  {
    id: "ev-5",
    agentId: "agent-social",
    time: "07:40",
    message: "Emotion shift: fear mentions +12% in Lagos metro geohash.",
    severity: "critical",
  },
  {
    id: "ev-6",
    agentId: "agent-media",
    time: "07:12",
    message: "Synced morning broadcast monitors — no TV crisis framing yet.",
    severity: "info",
  },
]

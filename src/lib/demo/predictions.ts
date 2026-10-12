import type { CrisisAlert, ForecastPoint, Scenario } from "./types"

export const reputationForecast: ForecastPoint[] = [
  { day: "Mon", score: 74 },
  { day: "Tue", score: 73 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 72 },
  { day: "Fri", score: 71 },
  { day: "Sat", score: 72 },
  { day: "Sun", score: 72 },
  { day: "Mon+", score: 72, projected: 71 },
  { day: "Tue+", score: 72, projected: 69 },
  { day: "Wed+", score: 72, projected: 68 },
  { day: "Thu+", score: 72, projected: 70 },
  { day: "Fri+", score: 72, projected: 73 },
]

export const riskPrediction = {
  overallRisk: 46,
  escalationLikelihood: 58,
  trendProjection: "Payments friction may depress score 3–5 pts over 72h if unresolved.",
  drivers: [
    { label: "POS / card declines", weight: 38 },
    { label: "Outage rumour amplification", weight: 27 },
    { label: "Branch queue complaints", weight: 18 },
    { label: "Regulatory mentions", weight: 17 },
  ],
}

export const crisisAlerts: CrisisAlert[] = [
  {
    id: "alert-1",
    title: "Payments friction cluster accelerating",
    summary:
      "Contact-centre and social signals on POS/card declines rising faster than 14-day baseline.",
    severity: "high",
    escalationLikelihood: 58,
    detectedAt: "2026-10-12T07:55:00+01:00",
    sources: ["Contact centre", "X", "Reviews"],
    status: "escalating",
    theme: "Payments friction",
    mediaPickupProbability: 47,
    responseSlaMinutes: 95,
  },
  {
    id: "alert-2",
    title: "Unverified nationwide outage rumour",
    summary:
      "Low-authenticity rumour thread; Crisis Detection Agent advises pre-emptive clarification.",
    severity: "medium",
    escalationLikelihood: 34,
    detectedAt: "2026-10-11T16:10:00+01:00",
    sources: ["X"],
    status: "watching",
    theme: "Digital banking reliability",
    mediaPickupProbability: 22,
    responseSlaMinutes: 140,
  },
  {
    id: "alert-3",
    title: "Branch experience hotspot — VI",
    summary:
      "Repeated queue-time reviews at Victoria Island branch; localised reputational drag.",
    severity: "low",
    escalationLikelihood: 18,
    detectedAt: "2026-10-11T18:30:00+01:00",
    sources: ["Reviews"],
    status: "contained",
    theme: "Branch service quality",
    mediaPickupProbability: 8,
    responseSlaMinutes: 0,
  },
]

export const scenarios: Scenario[] = [
  {
    id: "sc-1",
    name: "Cards & payments disruption",
    trigger: "Escalation likelihood > 55% on payments theme for 2 hours",
    recommendedActions: [
      "Activate holding statement for media and social",
      "Brief Contact Centre with known error codes and ETA",
      "Notify Investor Relations if retail deposit chatter intensifies",
    ],
    draftMessages: [
      {
        audience: "Customers",
        message:
          "We are aware some customers are experiencing intermittent card declines. Our teams are investigating with priority. Alternative channels (USSD *966#, Zenith app transfers) remain available.",
      },
      {
        audience: "Media",
        message:
          "Zenith Bank is investigating a subset of POS transaction declines reported this morning. There is no evidence of a systemic outage. We will update as diagnostics complete.",
      },
      {
        audience: "Regulators",
        message:
          "Preliminary assessment indicates intermittent acquirer-side declines affecting a limited transaction cohort. Incident bridge active; SLA updates to follow within 2 hours.",
      },
    ],
  },
  {
    id: "sc-2",
    name: "Digital outage rumour",
    trigger: "Rumour authenticity < 0.3 with reach > 40k in 60 minutes",
    recommendedActions: [
      "Publish status confirmation on owned channels",
      "Engage top amplifying accounts with factual reply",
      "Monitor TV desks for pickup risk",
    ],
    draftMessages: [
      {
        audience: "Customers",
        message:
          "Zenith digital channels are operating normally. Reports of a nationwide outage are inaccurate. If you experience an issue, retry or use *966#.",
      },
      {
        audience: "Media",
        message:
          "Claims of a nationwide Zenith app outage circulating on social media are unverified and inconsistent with our live telemetry.",
      },
    ],
  },
]

export const sourceMix = [
  { name: "News", value: 28 },
  { name: "Social", value: 34 },
  { name: "Contact centre", value: 18 },
  { name: "Surveys", value: 9 },
  { name: "Reviews", value: 7 },
  { name: "Digital owned", value: 4 },
]

export const brandHealth = {
  score: 78,
  awareness: 91,
  consideration: 64,
  advocacy: 71,
  complaintIndex: 22,
}

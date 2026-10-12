export type Channel =
  | "social"
  | "news"
  | "reviews"
  | "contact_center"
  | "survey"
  | "digital"

export type Sentiment = "positive" | "neutral" | "negative"

export type Emotion =
  | "trust"
  | "joy"
  | "anger"
  | "fear"
  | "surprise"
  | "disappointment"

export type NarrativeStage = "calm" | "concern" | "incident" | "crisis"

export type Signal = {
  id: string
  source: string
  channel: Channel
  title: string
  excerpt: string
  timestamp: string
  sentiment: Sentiment
  emotion: Emotion
  topic: string
  theme: string
  reach: number
  location?: string
  sentimentConfidence: number
  corroboratingChannels: Channel[]
}

export type ThemeCluster = {
  id: string
  name: string
  volume: number
  sentiment: Sentiment
  changePct: number
  description: string
  velocityPerHour: number
  velocityBaseline: number
}

export type AgentStatus = "active" | "idle" | "alerting"

export type Agent = {
  id: string
  name: string
  role: string
  status: AgentStatus
  lastAction: string
  signalsProcessed: number
}

export type AgentEvent = {
  id: string
  agentId: string
  time: string
  message: string
  severity: "info" | "warning" | "critical"
}

export type CrisisAlert = {
  id: string
  title: string
  summary: string
  severity: "low" | "medium" | "high" | "critical"
  escalationLikelihood: number
  detectedAt: string
  sources: string[]
  status: "watching" | "escalating" | "contained" | "acknowledged"
  theme: string
  mediaPickupProbability: number
  responseSlaMinutes: number
  assignee?: string
}

export type Scenario = {
  id: string
  name: string
  trigger: string
  recommendedActions: string[]
  draftMessages: { audience: string; message: string }[]
}

export type ForecastPoint = {
  day: string
  score: number
  projected?: number
}

export type GenAIDocument = {
  id: string
  type: "executive_summary" | "media_brief" | "situation_report" | "recommended_actions"
  title: string
  generatedAt: string
  body: string
  bullets?: string[]
}

export type GeoVolume = {
  region: string
  volume: number
  share: number
}

export type PeerShareOfVoice = {
  name: string
  share: number
  sentiment: number
}

import type { GeoVolume, NarrativeStage, PeerShareOfVoice } from "./types"

export const amplificationVelocity = {
  currentPerHour: 42,
  baselinePerHour: 24,
  changePct: 75,
  label: "Above baseline — payments + rumour themes",
}

export const geoVolumes: GeoVolume[] = [
  { region: "Lagos", volume: 186, share: 41 },
  { region: "Abuja", volume: 72, share: 16 },
  { region: "Rivers", volume: 48, share: 11 },
  { region: "Kano", volume: 39, share: 9 },
  { region: "Nationwide", volume: 111, share: 23 },
]

export const peerShareOfVoice: PeerShareOfVoice[] = [
  { name: "Zenith", share: 28, sentiment: 0.12 },
  { name: "GTCO", share: 24, sentiment: 0.08 },
  { name: "Access", share: 22, sentiment: -0.04 },
  { name: "FirstBank", share: 18, sentiment: 0.02 },
  { name: "Others", share: 8, sentiment: 0 },
]

export const narrativeState: {
  stage: NarrativeStage
  label: string
  summary: string
  since: string
} = {
  stage: "incident",
  label: "Incident",
  summary:
    "Payments friction has moved past Concern into Incident: multi-channel corroboration with rising velocity. Crisis protocol on standby.",
  since: "2026-10-12T07:55:00+01:00",
}

export const narrativeStages: { id: NarrativeStage; label: string }[] = [
  { id: "calm", label: "Calm" },
  { id: "concern", label: "Concern" },
  { id: "incident", label: "Incident" },
  { id: "crisis", label: "Crisis" },
]

import type { GenAIDocument } from "./types"

export const genaiDocuments: Record<string, GenAIDocument> = {
  executive_summary: {
    id: "gen-exec",
    type: "executive_summary",
    title: "Executive reputation summary — 12 Oct 2026",
    generatedAt: "2026-10-12T09:00:00+01:00",
    body: "Zenith's overall reputation score holds at 72 (‑2 vs prior week). Positive equity from SME academy and women-in-banking content offsets rising payments friction. Crisis Detection Agent flags a high-priority payments cluster with 58% escalation likelihood. Recommend same-day customer clarification and Contact Centre briefing before evening news cycle.",
    bullets: [
      "Score 72 — stable, with downside risk if POS issues persist 72h",
      "Payments friction is the dominant negative driver (+34% volume)",
      "Outage rumour authenticity low; still warrants owned-channel rebuttal",
      "Investor narrative remains constructive ahead of earnings",
    ],
  },
  media_brief: {
    id: "gen-media",
    type: "media_brief",
    title: "Media brief — morning cycle",
    generatedAt: "2026-10-12T08:50:00+01:00",
    body: "National business press focus is FX liquidity and Q3 earnings previews. Zenith appears in constructive frames. Consumer desks are quieter but social amplification of card declines could migrate to broadcast if unresolved. Suggested spokespeople: Retail Banking Ops + Corporate Communications.",
    bullets: [
      "Key outlets: BusinessDay, Nairametrics, Punch, ThisDay",
      "Avoid confirming rumour language; use 'intermittent declines' framing",
      "Offer SME academy human-interest as proactive positive placement",
    ],
  },
  situation_report: {
    id: "gen-sitrep",
    type: "situation_report",
    title: "Daily situation report",
    generatedAt: "2026-10-12T09:05:00+01:00",
    body: "Three agents online. Social Listening processed 1,842 signals overnight. Media Monitoring ingested 614 articles. Crisis Detection raised one high alert (payments) and continues watch on outage rumour. No regulatory enforcement narrative. Recommended posture: contained transparency + operational fix narrative.",
    bullets: [
      "Active alerts: 1 high, 1 medium, 1 low",
      "Projected score path: 72 → 68 over 72h (unmitigated)",
      "Mitigation target: return escalation likelihood below 40% by 18:00 WAT",
    ],
  },
  recommended_actions: {
    id: "gen-actions",
    type: "recommended_actions",
    title: "Recommended actions (next 6 hours)",
    generatedAt: "2026-10-12T09:06:00+01:00",
    body: "Prioritise payments communication and Contact Centre enablement. Parallel path: status confirmation post to dampen outage rumour. IR stay-ready only — no formal market update unless deposit chatter intensifies.",
    bullets: [
      "Publish customer holding statement on app, X, and WhatsApp broadcast",
      "Push Contact Centre playbook with alternate channels",
      "Brief VI branch manager on queue-time hotspot reviews",
      "Schedule 16:00 WAT re-forecast after mitigation signals land",
    ],
  },
  competitive_brief: {
    id: "gen-comp",
    type: "competitive_brief",
    title: "Competitive perception brief — 12 Oct 2026",
    generatedAt: "2026-10-12T09:20:00+01:00",
    body: "Zenith leads deposit-bank share of voice (18%) in a set that includes OPay, Moniepoint, PalmPay and MTN, but trails GTCO on reputation score and loses payments/agent narratives to fintechs. Public conversation frames Zenith as strong on community investment and earnings resilience, while POS friction and wallet convenience gaps are the clearest vulnerabilities this week.",
    bullets: [
      "Defend: payments clarity before Moniepoint/OPay reliability praise widens the merchant gap",
      "Amplify: SME academy / women-in-banking — Zenith’s clearest owned narrative",
      "Watch: MTN USSD/fraud chatter can migrate onto bank brands sharing the same rails",
      "Opportunity: contrast Zenith deposit trust against PalmPay/OPay innovation buzz",
    ],
  },
}

export function getGenAIDocument(type: GenAIDocument["type"]) {
  return genaiDocuments[type]
}

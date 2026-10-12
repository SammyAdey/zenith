import { LightModule } from "@/components/modules/light-module"

export const metadata = { title: "Stakeholder Mapping" }

export default function StakeholdersPage() {
  return (
    <LightModule
      eyebrow="Influence map"
      title="Stakeholder Influence Mapping"
      description="Understand and track key journalists, regulators, investors and advocates shaping Zenith's narrative."
      kpis={[
        {
          label: "Tracked stakeholders",
          value: "248",
          tooltip: "Total people and institutions in the influence graph—journalists, regulators, investors and advocates with recent Zenith-related activity.",
        },
        {
          label: "High influence",
          value: "36",
          hint: "Reach × authority",
          tooltip: "Stakeholders scoring high on reach × authority. Prioritise briefings and relationship management for this cohort first.",
        },
        {
          label: "Active this week",
          value: "19",
          tooltip: "Stakeholders who published, spoke or engaged on Zenith-relevant topics in the last 7 days.",
        },
        {
          label: "Sentiment shift",
          value: "+4 pts",
          hint: "Advocates vs critics",
          tooltip: "Net change in advocate versus critic framing this week. Positive means more supportive voices relative to critics.",
        },
      ]}
      panels={[
        {
          title: "Priority stakeholders",
          tooltip: "Highest-leverage nodes right now. Tags show role type; detail summarises current stance so Comms can sequence outreach.",
          items: [
            {
              label: "CBN Consumer Protection Desk",
              detail: "Regulatory · High influence · Neutral framing on SLA notes",
              tag: "Regulator",
            },
            {
              label: "BusinessDay Markets Desk",
              detail: "Media · Constructive FX liquidity coverage this cycle",
              tag: "Journalist",
            },
            {
              label: "Nigeria Pension Fund CIO circle",
              detail: "Investor · Watching deposit franchise resilience",
              tag: "Investor",
            },
          ],
        },
        {
          title: "Network signals",
          tooltip: "Clusters of aligned voices. Advocates amplify positive stories; Watch clusters can seed crises if volume accelerates.",
          items: [
            {
              label: "Advocate cluster — SME founders",
              detail: "Amplified Zenith SME academy graduation content",
              tag: "Advocate",
            },
            {
              label: "Critic cluster — payments forums",
              detail: "Coordinated frustration on POS declines in Lagos",
              tag: "Watch",
            },
            {
              label: "Bridge influencers — fintech editors",
              detail: "Open-banking speculation remains opportunity framing",
              tag: "Neutral+",
            },
          ],
        },
      ]}
      sampleOutput={{
        title: "AI stakeholder briefing (sample)",
        tooltip: "Generated engagement plan from the influence map. Treat as a draft agenda for Corporate Communications—not an automatic send.",
        body: "This week’s influence map shows regulators and business journalists as the highest-leverage nodes. Engage BusinessDay with a liquidity narrative while keeping CBN desk updated on complaint turnaround. De-prioritise rumour amplifiers until authenticity rises.",
        bullets: [
          "Top 5 journalists briefed with media pack",
          "Advocate activation on SME academy story",
          "Monitor payments-forum critics for escalation crossover",
        ],
      }}
    />
  )
}

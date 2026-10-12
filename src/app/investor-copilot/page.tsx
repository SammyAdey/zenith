import { LightModule } from "@/components/modules/light-module"

export const metadata = { title: "Investor Copilot" }

export default function InvestorCopilotPage() {
  return (
    <LightModule
      eyebrow="Capital markets"
      title="Investor & Analyst Copilot"
      description="Sharper earnings narratives, briefing packs and market-response insights for IR and leadership."
      kpis={[
        {
          label: "Briefing packs",
          value: "6",
          hint: "Ready this week",
          tooltip: "IR-ready packs assembled from media, reputation and market signals. Open a pack before earnings calls or analyst meetings.",
        },
        {
          label: "Narrative strength",
          value: "82",
          tooltip: "How coherent and resilient the current earnings story is (0–100). Higher means messages align across media and peer comparisons.",
        },
        {
          label: "Peer delta",
          value: "+3",
          hint: "vs tier-1 banks",
          tooltip: "Relative narrative advantage versus peer banks. Positive = Zenith framed more favourably on shared themes this cycle.",
        },
        {
          label: "Risk mentions",
          value: "Low",
          tooltip: "Intensity of risk language in analyst and financial media coverage. Rising levels warrant IR stay-ready language.",
        },
      ]}
      panels={[
        {
          title: "Earnings narrative angles",
          tooltip: "Suggested storylines ranked by priority. Primary = lead message; Support strengthens it; Watch needs defensive prep.",
          items: [
            {
              label: "NIM resilience",
              detail: "Highlight funding mix and retail deposit franchise",
              tag: "Primary",
            },
            {
              label: "Digital adoption",
              detail: "Balance USSD recovery story with reliability roadmap",
              tag: "Support",
            },
            {
              label: "Asset quality",
              detail: "Stay ahead of SME restructuring questions",
              tag: "Watch",
            },
          ],
        },
        {
          title: "Analyst Q&A prep",
          tooltip: "Likely questions inferred from media and peer chatter, with calibrated talking points for leadership.",
          items: [
            {
              label: "FX liquidity positioning",
              detail: "Prepared talking points aligned to BusinessDay framing",
            },
            {
              label: "Payments incident disclosure",
              detail: "IR stay-ready; escalate only if deposit chatter intensifies",
            },
            {
              label: "Retail growth trajectory",
              detail: "Link advocacy campaigns to acquisition funnel metrics",
            },
          ],
        },
      ]}
      sampleOutput={{
        title: "Sample earnings briefing pack excerpt",
        tooltip: "Example GenAI briefing for leadership. Validate figures with Finance before use in live markets communication.",
        body: "Zenith enters the print window with a constructive sell-side tone. Lead with deposit franchise and NIM discipline. Address digital reliability as an operations continuous-improvement story—not a crisis—unless payments escalation crosses 60%.",
        bullets: [
          "One-pager for CEO/CFO already drafted",
          "Peer comparison table auto-refreshed from media signals",
          "Suggested FAQ: 12 questions / 12 calibrated answers",
        ],
      }}
    />
  )
}

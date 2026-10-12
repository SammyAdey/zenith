import { LightModule } from "@/components/modules/light-module"

export const metadata = { title: "Personalised Communications" }

export default function PersonalisedPage() {
  return (
    <LightModule
      eyebrow="One narrative"
      title="Personalised Communications"
      description="One trusted narrative, automatically tailored by audience and channel—without fragmenting the brand voice."
      kpis={[
        {
          label: "Master narrative",
          value: "Live",
          tooltip: "Status of the single approved brand story. Live means variants are derived from the current master—not free-form drafts.",
        },
        {
          label: "Audience variants",
          value: "8",
          tooltip: "Number of audience-specific adaptations generated from the master narrative (retail, SME, staff, etc.).",
        },
        {
          label: "Channels synced",
          value: "5",
          tooltip: "Owned and earned channels currently mapped to the master narrative so wording stays consistent.",
        },
        {
          label: "Consistency score",
          value: "94%",
          tooltip: "How closely channel variants stay within brand and compliance guardrails. Drops when tone or claims diverge too far.",
        },
      ]}
      panels={[
        {
          title: "Audience variants",
          tooltip: "Same core message adapted by audience. Tags show recommended distribution channels for each variant.",
          items: [
            {
              label: "Retail customers",
              detail: "Emphasise availability of alternate channels and empathy",
              tag: "Social + App",
            },
            {
              label: "SME clients",
              detail: "Reassure settlement timelines and relationship manager access",
              tag: "Email",
            },
            {
              label: "Staff advocates",
              detail: "Equip with facts to counter outage rumour offline",
              tag: "Intranet",
            },
          ],
        },
        {
          title: "Channel adaptations",
          tooltip: "Format and length changes for each channel while preserving meaning. Prefer short social confirmations; keep formal language for press.",
          items: [
            {
              label: "X / Instagram",
              detail: "Short confirmation + link to status help article",
            },
            {
              label: "Press release",
              detail: "Formal intermittent-decline language; no rumour echo",
            },
            {
              label: "Branch posters / QR",
              detail: "Localised queue-time apology with digital self-serve prompt",
            },
          ],
        },
      ]}
      sampleOutput={{
        title: "Master narrative (sample)",
        tooltip: "Canonical story all variants should echo. Edit here first—audience and channel copies regenerate from this source.",
        body: "Zenith Bank is focused on reliable everyday banking for Nigerians. Where customers encounter friction, we act quickly, communicate clearly, and keep alternative channels open—while continuing to invest in communities and businesses that grow with us.",
        bullets: [
          "Variants generated for 8 audiences in under 30 seconds (simulated)",
          "Tone guardrails enforce brand voice + compliance lexicon",
          "Diff view shows only channel-safe adaptations",
        ],
      }}
    />
  )
}

import { LightModule } from "@/components/modules/light-module"

export const metadata = { title: "Employee Copilot" }

export default function EmployeeCopilotPage() {
  return (
    <LightModule
      eyebrow="Internal enablement"
      title="Employee Communications Copilot"
      description="Faster access to strategy, leadership messages and policy updates—so every colleague speaks with one informed voice."
      kpis={[
        {
          label: "Knowledge articles",
          value: "1,240",
          tooltip: "Indexed internal articles, policies and talking points the copilot can retrieve for staff answers.",
        },
        {
          label: "Avg answer time",
          value: "4s",
          hint: "Simulated retrieval",
          tooltip: "Typical time to return a grounded answer from the knowledge base. Demo uses simulated latency.",
        },
        {
          label: "Leadership briefs",
          value: "12",
          hint: "This quarter",
          tooltip: "Leadership messages queued or published this quarter that staff can ask about or cascade.",
        },
        {
          label: "Policy freshness",
          value: "98%",
          tooltip: "Share of cited policies that are within their review window. Lower freshness means answers may need Comms verification.",
        },
      ]}
      panels={[
        {
          title: "Suggested employee Q&A",
          tooltip: "Common colleague questions with approved answers. Tags show topic domain—use Crisis-tagged answers when rumours are active.",
          items: [
            {
              label: "“Are we having a nationwide outage?”",
              detail: "No. Owned channels confirm normal operations; rumour authenticity is low.",
              tag: "Crisis",
            },
            {
              label: "“What do I tell customers about POS declines?”",
              detail: "Share holding statement; offer USSD *966# and app transfers.",
              tag: "Service",
            },
            {
              label: "“Where is the SME academy talking points pack?”",
              detail: "Linked in Internal Comms → Campaigns → Q4 Community.",
              tag: "Brand",
            },
          ],
        },
        {
          title: "Leadership message queue",
          tooltip: "Draft and live leadership communications ready for cascade. Review before distributing to branches.",
          items: [
            {
              label: "GMD weekly note — draft",
              detail: "Theme: reliability + customer empathy during payments review",
            },
            {
              label: "Branch managers huddle script",
              detail: "3-minute talking points for morning stand-up",
            },
            {
              label: "Policy update — complaint SLA",
              detail: "Aligned to regulator consumer protection expectations",
            },
          ],
        },
      ]}
      sampleOutput={{
        title: "Sample copilot answer",
        tooltip: "Example grounded reply. Good answers cite Crisis Command Centre status and approved holding statements—flag for Comms if confidence is low.",
        body: "If a customer asks about rumoured outages: thank them, confirm digital channels are operating normally, invite them to retry or use *966#, and escalate verified failures via the Contact Centre playbook. Do not repeat unverified social claims.",
        bullets: [
          "Grounded in latest Crisis Command Centre status",
          "Links to approved holding statements",
          "Flags when a question needs Comms escalation",
        ],
      }}
    />
  )
}

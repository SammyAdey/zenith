import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { InfoTip } from "@/components/dashboard/info-tip"
import { KpiTile } from "@/components/dashboard/kpi-tile"
import { PageHeader } from "@/components/dashboard/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type LightModuleProps = {
  eyebrow: string
  title: string
  description: string
  kpis: { label: string; value: string; hint?: string; tooltip?: string }[]
  panels: {
    title: string
    tooltip?: string
    items: { label: string; detail: string; tag?: string }[]
  }[]
  sampleOutput: {
    title: string
    tooltip?: string
    body: string
    bullets?: string[]
  }
}

export function LightModule({
  eyebrow,
  title,
  description,
  kpis,
  panels,
  sampleOutput,
}: LightModuleProps) {
  return (
    <div className="w-full space-y-8 animate-fade-up">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="brand"
            size="sm"
            className="gap-1.5"
          >
            Open Crisis Command Centre
            <ArrowRight className="size-3.5" />
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile
            key={k.label}
            label={k.label}
            value={k.value}
            hint={k.hint}
            tooltip={k.tooltip}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {panels.map((panel) => (
          <Card key={panel.title} className="shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                {panel.title}
                {panel.tooltip && <InfoTip content={panel.tooltip} />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {panel.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium tracking-tight">{item.label}</p>
                    {item.tag && (
                      <Badge variant="secondary" className="font-normal">
                        {item.tag}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
            {sampleOutput.title}
            {sampleOutput.tooltip && <InfoTip content={sampleOutput.tooltip} />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{sampleOutput.body}</p>
          {sampleOutput.bullets && (
            <ul className="mt-4 space-y-2 rounded-xl border border-border bg-surface-field p-4">
              {sampleOutput.bullets.map((b) => (
                <li key={b} className="text-sm">
                  <span className="mr-2 text-brand">•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              nativeButton={false}
              render={<Link href="/brand-intelligence" />}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              View Brand Intelligence
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

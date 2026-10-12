"use client"

import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { useSimulatedAction } from "@/hooks/use-simulated-action"
import { getGenAIDocument } from "@/lib/demo/genai"
import type { GenAIDocument } from "@/lib/demo/types"

export function GenAISheetButton({
  type,
  label,
  variant = "outline",
}: {
  type: GenAIDocument["type"]
  label: string
  variant?: "outline" | "brand" | "default"
}) {
  const doc = getGenAIDocument(type)
  const { loading, data, run, reset } = useSimulatedAction(doc, 1100)

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) void run()
        else reset()
      }}
    >
      <SheetTrigger
        render={
          <Button variant={variant} size="sm" className="gap-1.5" />
        }
      >
        <Sparkles className="size-3.5" />
        {label}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="tracking-tight">{doc.title}</SheetTitle>
          <SheetDescription>
            Simulated generative AI output for demo walkthrough.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-4">
          {loading && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {!loading && data && (
            <>
              <p className="text-sm leading-relaxed text-foreground">{data.body}</p>
              {data.bullets && (
                <ul className="space-y-2 rounded-xl border border-border bg-surface-field p-4">
                  {data.bullets.map((b) => (
                    <li key={b} className="text-sm text-foreground">
                      <span className="mr-2 text-brand">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[11px] text-muted-foreground">
                Generated {new Date(data.generatedAt).toLocaleString("en-NG")} · Demo
                simulation
              </p>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

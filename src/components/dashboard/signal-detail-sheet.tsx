"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatReach, formatTime, sentimentClass } from "@/lib/demo/format"
import type { Signal } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

export function SignalDetailSheet({
  signal,
  open,
  onOpenChange,
}: {
  signal: Signal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!signal) return null

  const crisisRelevant =
    signal.sentiment === "negative" && (signal.reach > 1000 || signal.channel === "contact_center")

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="pr-8 tracking-tight">{signal.title}</SheetTitle>
          <SheetDescription>
            NLP classification detail · demo simulation
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-5 px-4 pb-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={cn("font-normal capitalize", sentimentClass(signal.sentiment))}>
              {signal.sentiment}
            </Badge>
            <Badge variant="outline" className="font-normal capitalize">
              {signal.emotion}
            </Badge>
            <Badge variant="secondary" className="font-normal">
              {signal.topic}
            </Badge>
          </div>

          <p className="text-sm leading-relaxed text-foreground">{signal.excerpt}</p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Source</p>
              <p className="mt-1 font-medium">{signal.source}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Channel</p>
              <p className="mt-1 font-medium capitalize">
                {signal.channel.replace("_", " ")}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Reach</p>
              <p className="mt-1 font-medium">{formatReach(signal.reach)}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Location</p>
              <p className="mt-1 font-medium">{signal.location ?? "—"}</p>
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
              <span>Sentiment confidence</span>
              <span className="font-medium text-foreground">
                {Math.round(signal.sentimentConfidence * 100)}%
              </span>
            </div>
            <Progress value={signal.sentimentConfidence * 100} className="h-1.5" />
          </div>

          <div>
            <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Theme</p>
            <p className="mt-1 text-sm font-medium text-brand">{signal.theme}</p>
          </div>

          <div>
            <p className="text-[10px] tracking-wide text-muted-foreground uppercase">
              Cross-channel corroboration
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {signal.corroboratingChannels.map((ch) => (
                <Badge key={ch} variant="outline" className="font-normal capitalize">
                  {ch.replace("_", " ")}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Detected {formatTime(signal.timestamp)}
          </p>

          {crisisRelevant && (
            <Button
              nativeButton={false}
              render={<Link href="/crisis" />}
              variant="brand"
              size="sm"
              className="w-full gap-1.5"
            >
              Open in Crisis Centre
              <ArrowRight className="size-3.5" />
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function formatReach(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  })
}

export function sentimentClass(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return "bg-status-success/15 text-status-success"
    case "negative":
      return "bg-status-failed/15 text-status-failed"
    default:
      return "bg-status-queued/15 text-status-queued"
  }
}

export function severityClass(severity: string) {
  switch (severity) {
    case "critical":
    case "high":
      return "bg-status-failed/15 text-status-failed"
    case "medium":
    case "warning":
      return "bg-status-warning/15 text-status-warning"
    case "low":
    case "info":
      return "bg-status-running/15 text-status-running"
    default:
      return "bg-muted text-muted-foreground"
  }
}

"use client"

import { useCallback, useState } from "react"

export function useSimulatedAction<T>(result: T, delayMs = 1200) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const run = useCallback(async () => {
    setLoading(true)
    setData(null)
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    setData(result)
    setLoading(false)
    return result
  }, [delayMs, result])

  const reset = useCallback(() => setData(null), [])

  return { loading, data, run, reset }
}

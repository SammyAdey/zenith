import Image from "next/image"

import { cn } from "@/lib/utils"

export function ZenithLogo({
  className,
  priority,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/zenith-logo.png"
      alt="Zenith Bank"
      width={28}
      height={28}
      priority={priority}
      className={cn("size-7 shrink-0 object-contain", className)}
    />
  )
}

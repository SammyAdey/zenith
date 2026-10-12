"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Radio, X } from "lucide-react"
import { useState } from "react"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { ZenithLogo } from "@/components/layout/zenith-logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <ul className="flex flex-col gap-0.5">
      {navItems.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-ink text-white dark:bg-brand dark:text-white"
                  : "text-foreground/75 hover:bg-surface-field hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{item.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-border bg-surface-muted p-4 md:flex">
        <Link href="/" className="flex items-center gap-2.5 px-1">
          <ZenithLogo priority />
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              ZENITH BANK
            </p>
            <p className="truncate text-[10px] tracking-wide text-muted-foreground uppercase">
              Corporate Communications
            </p>
          </div>
        </Link>

        <nav className="mt-6 flex-1">
          <p className="mb-2 px-3 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
            Modules
          </p>
          <NavLinks />
        </nav>

        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-status-success" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Agents live
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            3 AI agents monitoring Nigerian media & social signals.
          </p>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute top-0 left-0 flex h-full w-72 flex-col bg-surface-muted p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ZenithLogo />
                <p className="text-sm font-semibold tracking-tight">ZENITH BANK</p>
              </div>
              <button
                type="button"
                className="cursor-pointer p-1"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="mt-6">
              <NavLinks onNavigate={() => setOpen(false)} />
            </nav>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <div>
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                AI-enabled functional transform
              </p>
              <p className="text-sm font-medium tracking-tight text-foreground">
                Reputation Sensing Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="hidden gap-1.5 font-normal sm:inline-flex"
            >
              <Radio className="size-3 text-status-running" />
              Live sensing
            </Badge>
            <Separator orientation="vertical" className="hidden h-6 sm:block" />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  )
}

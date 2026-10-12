import {
  AlertTriangle,
  Briefcase,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Radar,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  deep?: boolean
  /** Hidden from sidebar for now; routes still exist */
  hidden?: boolean
}

export const allNavItems: NavItem[] = [
  { href: "/", label: "Command Centre", icon: LayoutDashboard },
  { href: "/reputation", label: "Reputation Intelligence", icon: Radar, deep: true },
  { href: "/crisis", label: "Crisis Command Centre", icon: AlertTriangle, deep: true },
  { href: "/stakeholders", label: "Stakeholder Mapping", icon: Users, hidden: true },
  { href: "/investor-copilot", label: "Investor Copilot", icon: Briefcase, hidden: true },
  { href: "/personalised", label: "Personalised Comms", icon: Megaphone, hidden: true },
  { href: "/employee-copilot", label: "Employee Copilot", icon: MessageSquare, hidden: true },
  { href: "/brand-intelligence", label: "Brand Intelligence", icon: Sparkles, deep: true },
]

export const navItems = allNavItems.filter((item) => !item.hidden)

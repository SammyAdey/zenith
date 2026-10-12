import {
  AlertTriangle,
  Briefcase,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Scale,
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
  { href: "/brand-intelligence", label: "Brand Intelligence", icon: Sparkles, deep: true },
  { href: "/", label: "Crisis Command Centre", icon: LayoutDashboard, deep: true },
  { href: "/competitors", label: "Competitor Analysis", icon: Scale, deep: true },
  { href: "/crisis", label: "Crisis Command Centre", icon: AlertTriangle, hidden: true },
  { href: "/reputation", label: "Reputation Intelligence", icon: Sparkles, hidden: true },
  { href: "/stakeholders", label: "Stakeholder Mapping", icon: Users, hidden: true },
  { href: "/investor-copilot", label: "Investor Copilot", icon: Briefcase, hidden: true },
  { href: "/personalised", label: "Personalised Comms", icon: Megaphone, hidden: true },
  { href: "/employee-copilot", label: "Employee Copilot", icon: MessageSquare, hidden: true },
]

export const navItems = allNavItems.filter((item) => !item.hidden)

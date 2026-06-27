import {
  LayoutDashboard,
  CalendarCheck,
  PlusCircle,
  Users,
  BarChart3,
  Settings,
  ScanLine,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Attendance Sessions", href: "/dashboard/sessions", icon: CalendarCheck },
      { label: "Create Session", href: "/dashboard/sessions/new", icon: PlusCircle },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Students", href: "/dashboard/students", icon: Users },
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export const studentNavItems: NavItem[] = [
  { label: "Scan QR", href: "/dashboard/scan", icon: ScanLine },
];

import type { ComponentType } from 'react';
import {
    Bell,
    Briefcase,
    Building2,
    Calendar,
    CalendarClock,
    ClipboardList,
    Flag,
    FolderTree,
    LayoutDashboard,
    Link2,
    MessageSquare,
    ScrollText,
    Settings,
    Sparkles,
    UserCircle2,
    Users,
} from 'lucide-react';

export const adminMenuIcons = {
    dashboard: LayoutDashboard,
    users: Users,
    profiles: UserCircle2,
    categories: FolderTree,
    skills: Sparkles,
    companies: Building2,
    jobs: Briefcase,
    applications: ClipboardList,
    connections: Link2,
    events: Calendar,
    eventRequests: CalendarClock,
    reports: Flag,
    notifications: Bell,
    logs: ScrollText,
} as const;

export const webMenuIcons = {
    dashboard: LayoutDashboard,
    profile: UserCircle2,
    developers: Users,
    jobs: Briefcase,
    applications: ClipboardList,
    connections: Link2,
    messages: MessageSquare,
    events: Calendar,
    notifications: Bell,
    settings: Settings,
} as const;

export const companyMenuIcons = {
    dashboard: LayoutDashboard,
    profile: Building2,
    jobs: Briefcase,
    applications: ClipboardList,
} as const;

export function navIcon(Icon: ComponentType<{ className?: string }>) {
    return <Icon className="h-4 w-4 shrink-0" />;
}

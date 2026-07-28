import type { NavItem } from '@/components/layouts/AppShell';
import type { TranslationKey } from '@/lib/i18n/en';

export function adminNavItems(t: TranslationKey): NavItem[] {
    return [
        { label: t.nav.dashboard, href: '/admin/dashboard' },
        { label: t.nav.users, href: '/admin/users' },
        { label: 'Developer Profiles', href: '/admin/developer-profiles' },
        { label: t.nav.categories, href: '/admin/categories' },
        { label: t.nav.skills, href: '/admin/skills' },
        { label: t.nav.connections, href: '/admin/connections' },
        { label: t.nav.events, href: '/admin/events' },
        { label: 'Event Requests', href: '/admin/event-requests' },
        { label: t.nav.reports, href: '/admin/reports' },
        { label: t.nav.notifications, href: '/admin/notifications' },
        { label: t.nav.companies, href: '/admin/companies' },
        { label: t.nav.jobs, href: '/admin/jobs' },
        { label: 'Job Applications', href: '/admin/job-applications' },
        { label: t.nav.logs, href: '/admin/logs' },
    ];
}

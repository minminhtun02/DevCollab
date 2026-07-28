import type { NavItem } from '@/components/layouts/AppShell';
import type { TranslationKey } from '@/lib/i18n/en';

export function webNavItems(t: TranslationKey): NavItem[] {
    return [
        { label: t.nav.dashboard, href: '/app/dashboard' },
        { label: t.nav.profile, href: '/app/profile' },
        { label: t.nav.developers, href: '/app/developers' },
        { label: t.nav.jobs, href: '/app/jobs' },
        { label: t.nav.applications, href: '/app/applications' },
        { label: t.nav.connections, href: '/app/connections' },
        { label: t.nav.messages, href: '/app/messages' },
        { label: t.nav.events, href: '/app/events' },
        { label: t.nav.notifications, href: '/app/notifications' },
        { label: t.nav.settings, href: '/app/settings' },
    ];
}

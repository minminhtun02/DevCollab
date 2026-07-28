import type { NavItem } from '@/components/layouts/AppShell';
import type { TranslationKey } from '@/lib/i18n/en';

export function companyNavItems(t: TranslationKey): NavItem[] {
    return [
        { label: t.nav.dashboard, href: '/company/dashboard' },
        { label: t.nav.profile, href: '/company/profile' },
        { label: t.nav.jobs, href: '/company/jobs' },
        { label: t.nav.applications, href: '/company/applications' },
    ];
}

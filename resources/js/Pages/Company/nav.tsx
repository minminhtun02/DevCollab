import type { TFunction } from 'i18next';
import type { NavItem } from '@/components/layouts/ConnectShell';
import { companyMenuIcons, navIcon } from '@/lib/menu-icons';

export function companyNavItems(t: TFunction): NavItem[] {
    const icon = (key: keyof typeof companyMenuIcons) => navIcon(companyMenuIcons[key]);

    return [
        { label: t('menu.dashboard'), href: '/company/dashboard', icon: icon('dashboard') },
        { label: t('company.menu.profile', { defaultValue: 'Profile' }), href: '/company/profile', icon: icon('profile') },
        { label: t('menu.jobs'), href: '/company/jobs', icon: icon('jobs') },
        { label: t('menu.jobApplications'), href: '/company/applications', icon: icon('applications') },
    ];
}

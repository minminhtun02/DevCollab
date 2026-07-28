import type { TFunction } from 'i18next';
import type { NavItem } from '@/components/layouts/ConnectShell';
import { adminMenuIcons, navIcon } from '@/lib/menu-icons';

export function adminNavItems(t: TFunction): NavItem[] {
    const icon = (key: keyof typeof adminMenuIcons) => navIcon(adminMenuIcons[key]);

    return [
        { label: t('menu.dashboard'), href: '/admin/dashboard', icon: icon('dashboard') },
        { label: t('menu.users'), href: '/admin/users', icon: icon('users') },
        { label: t('menu.profiles'), href: '/admin/developer-profiles', icon: icon('profiles') },
        { label: t('menu.categories'), href: '/admin/categories', icon: icon('categories') },
        { label: t('menu.skills'), href: '/admin/skills', icon: icon('skills') },
        { label: t('menu.connections'), href: '/admin/connections', icon: icon('connections') },
        { label: t('menu.events'), href: '/admin/events', icon: icon('events') },
        { label: t('menu.eventRequests'), href: '/admin/event-requests', icon: icon('eventRequests') },
        { label: t('menu.reports'), href: '/admin/reports', icon: icon('reports') },
        { label: t('menu.notifications'), href: '/admin/notifications', icon: icon('notifications') },
        { label: t('menu.companies'), href: '/admin/companies', icon: icon('companies') },
        { label: t('menu.jobs'), href: '/admin/jobs', icon: icon('jobs') },
        { label: t('menu.jobApplications'), href: '/admin/job-applications', icon: icon('applications') },
        { label: t('menu.logs'), href: '/admin/logs', icon: icon('logs') },
    ];
}

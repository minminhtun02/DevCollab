import type { TFunction } from 'i18next';
import type { NavItem } from '@/components/layouts/ConnectShell';
import { navIcon, webMenuIcons } from '@/lib/menu-icons';

export function webNavItems(t: TFunction): NavItem[] {
    const icon = (key: keyof typeof webMenuIcons) => navIcon(webMenuIcons[key]);

    return [
        { label: t('menu.dashboard'), href: '/app/dashboard', icon: icon('dashboard') },
        { label: t('webMenu.profile'), href: '/app/profile', icon: icon('profile') },
        { label: t('webMenu.developers'), href: '/app/developers', icon: icon('developers') },
        { label: t('menu.jobs'), href: '/app/jobs', icon: icon('jobs') },
        { label: t('webMenu.applications'), href: '/app/applications', icon: icon('applications') },
        { label: t('webMenu.connections'), href: '/app/connections', icon: icon('connections') },
        { label: t('webMenu.messages'), href: '/app/messages', icon: icon('messages') },
        { label: t('menu.events'), href: '/app/events', icon: icon('events') },
        { label: t('menu.notifications'), href: '/app/notifications', icon: icon('notifications') },
        { label: t('webMenu.settings'), href: '/app/settings', icon: icon('settings') },
    ];
}

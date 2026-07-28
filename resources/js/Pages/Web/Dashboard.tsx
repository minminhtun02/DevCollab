import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { PageHeader, ListStateView } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import type { ApiEnvelope } from '@/types/api';
import { webNavItems } from './nav';

interface MeUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    phone?: string | null;
    developer_profile?: { headline?: string | null; location?: string | null } | null;
}

export default function Dashboard() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['web', 'auth', 'me'],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<MeUser>>('/v1/web/auth/me', { signal });
            return response.data.data;
        },
    });

    const quickLinks = [
        { label: t('webMenu.profile'), href: '/app/profile' },
        { label: t('menu.jobs'), href: '/app/jobs' },
        { label: t('webMenu.developers'), href: '/app/developers' },
        { label: t('webMenu.messages'), href: '/app/messages' },
        { label: t('menu.events'), href: '/app/events' },
        { label: t('webMenu.settings'), href: '/app/settings' },
    ];

    return (
        <AuthGuard portal="web" loginPath="/login">
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader description={t('web.dashboard.tagline')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={false}>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{data?.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-slate-600">
                                <p>{data?.email}</p>
                                {data?.phone && <p>{data.phone}</p>}
                                {data?.developer_profile?.headline && (
                                    <p className="font-medium text-slate-800">{data.developer_profile.headline}</p>
                                )}
                                {data?.developer_profile?.location && <p>{data.developer_profile.location}</p>}
                                <p className="capitalize">
                                    {data?.role} · {data?.status}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('webMenu.quickLinks')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {quickLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </ListStateView>
            </ConnectShell>
        </AuthGuard>
    );
}

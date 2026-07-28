import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader, ListStateView } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/lib/i18n';
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
        { label: t.nav.profile, href: '/app/profile' },
        { label: t.nav.jobs, href: '/app/jobs' },
        { label: t.nav.developers, href: '/app/developers' },
        { label: t.nav.messages, href: '/app/messages' },
        { label: t.nav.events, href: '/app/events' },
        { label: t.nav.settings, href: '/app/settings' },
    ];

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.dashboard}>
                <PageHeader title={t.nav.dashboard} description={t.app.tagline} />
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
                                <CardTitle>Quick links</CardTitle>
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
            </AppShell>
        </AuthGuard>
    );
}

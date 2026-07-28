import { useQuery } from '@tanstack/react-query';
import { AppShell } from '@/components/layouts/AppShell';
import { ListStateView, PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/lib/i18n';
import type { ApiEnvelope } from '@/types/api';
import { adminNavItems } from './nav';

interface AdminStats {
    users: number;
    developers: number;
    companies: number;
    jobs: number;
    job_applications: number;
    connections: number;
    events: number;
    pending_reports: number;
}

const statLabels: { key: keyof AdminStats; label: string }[] = [
    { key: 'users', label: 'Users' },
    { key: 'developers', label: 'Developers' },
    { key: 'companies', label: 'Companies' },
    { key: 'jobs', label: 'Jobs' },
    { key: 'job_applications', label: 'Job Applications' },
    { key: 'connections', label: 'Connections' },
    { key: 'events', label: 'Events' },
    { key: 'pending_reports', label: 'Pending Reports' },
];

export default function Dashboard() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'dashboard', 'stats'],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<AdminStats>>('/v1/admin/dashboard/stats', { signal });
            return response.data.data;
        },
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title={t.nav.dashboard}>
                <PageHeader title={t.nav.dashboard} description="Platform overview and key metrics." />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={false}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {statLabels.map(({ key, label }) => (
                            <Card key={key}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">{label}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-slate-900">{data?.[key] ?? 0}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ListStateView>
            </AppShell>
        </AuthGuard>
    );
}

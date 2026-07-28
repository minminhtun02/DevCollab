import { useQuery } from '@tanstack/react-query';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { ListStateView, PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import type { ApiEnvelope } from '@/types/api';
import { companyNavItems } from './nav';

interface CompanyStats {
    total_jobs: number;
    published_jobs: number;
    draft_jobs: number;
    closed_jobs: number;
    pending_applications: number;
}

const statLabels: { key: keyof CompanyStats; label: string }[] = [
    { key: 'total_jobs', label: 'Total Jobs' },
    { key: 'published_jobs', label: 'Published' },
    { key: 'draft_jobs', label: 'Drafts' },
    { key: 'closed_jobs', label: 'Closed' },
    { key: 'pending_applications', label: 'Pending Applications' },
];

export default function Dashboard() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['company', 'dashboard', 'stats'],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<CompanyStats>>('/v1/company/dashboard/stats', { signal });
            return response.data.data;
        },
    });

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader description="Your hiring overview." />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={false}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            </ConnectShell>
        </AuthGuard>
    );
}

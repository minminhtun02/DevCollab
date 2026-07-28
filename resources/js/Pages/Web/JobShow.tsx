import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { AppShell } from '@/components/layouts/AppShell';
import { ListStateView, PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/lib/i18n';
import type { ApiEnvelope } from '@/types/api';
import { webNavItems } from './nav';

interface JobDetail {
    id: number;
    title: string;
    description: string | null;
    location: string | null;
    employment_type: string | null;
    is_remote: boolean;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string | null;
    status: string | null;
    company_profile?: { company_name: string; location?: string | null } | null;
    category?: { name: string } | null;
}

function useJobId(): string {
    if (typeof window === 'undefined') return '';
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? '';
}

export default function JobShow() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const jobId = useJobId();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['web', 'jobs', jobId],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<JobDetail>>(`/v1/web/jobs/${jobId}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(jobId),
    });

    const salary =
        data?.salary_min != null || data?.salary_max != null
            ? [data?.salary_min, data?.salary_max].filter((v) => v != null).join(' – ') +
              (data?.salary_currency ? ` ${data.salary_currency}` : '')
            : null;

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.jobs}>
                <PageHeader
                    title={data?.title ?? t.nav.jobs}
                    actions={
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/app/jobs">{t.common.back}</Link>
                        </Button>
                    }
                />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    {data && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{data.title}</CardTitle>
                                <p className="text-sm text-slate-500">
                                    {data.company_profile?.company_name}
                                    {data.location ? ` · ${data.location}` : ''}
                                    {data.is_remote ? ' · Remote' : ''}
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-slate-700">
                                {data.category?.name && (
                                    <p>
                                        <span className="font-medium">Category:</span> {data.category.name}
                                    </p>
                                )}
                                {data.employment_type && (
                                    <p>
                                        <span className="font-medium">Employment:</span> {data.employment_type}
                                    </p>
                                )}
                                {salary && (
                                    <p>
                                        <span className="font-medium">Salary:</span> {salary}
                                    </p>
                                )}
                                {data.status && (
                                    <p>
                                        <span className="font-medium">Status:</span> {data.status}
                                    </p>
                                )}
                                {data.description && (
                                    <div>
                                        <p className="mb-2 font-medium">Description</p>
                                        <p className="whitespace-pre-wrap">{data.description}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </ListStateView>
            </AppShell>
        </AuthGuard>
    );
}

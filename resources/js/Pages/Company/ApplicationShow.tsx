import { useQuery } from '@tanstack/react-query';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { AdminDetailActions } from '@/components/admin/AdminDetailActions';
import { DetailCard, DetailField, ListStateView, PageHeader, StatusBadge } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useResourceId } from '@/hooks/useRouteId';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { formatDate } from '@/lib/format-date';
import type { ApiEnvelope } from '@/types/api';
import { companyNavItems } from './nav';

interface ApplicationDetail {
    id: number;
    status: string | null;
    cover_letter: string | null;
    created_at: string | null;
    job?: { title: string } | null;
    user?: { name: string; email: string } | null;
}

export default function ApplicationShow() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);
    const id = useResourceId();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['company', 'applications', id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<ApplicationDetail>>(`/v1/company/job-applications/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader title={t('company.menu.applications')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    {data && (
                        <div className="space-y-6">
                            <AdminDetailActions backHref="/company/applications" />
                            <DetailCard title={data.user?.name ?? 'Application'}>
                                <DetailField label="Email" value={data.user?.email} />
                                <DetailField label="Job" value={data.job?.title} />
                                <DetailField label="Status" value={<StatusBadge status={data.status} />} />
                                <DetailField label="Cover letter" value={data.cover_letter} />
                                <DetailField label="Applied" value={formatDate(data.created_at, true)} />
                            </DetailCard>
                        </div>
                    )}
                </ListStateView>
            </ConnectShell>
        </AuthGuard>
    );
}

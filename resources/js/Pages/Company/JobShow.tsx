import { useQuery } from '@tanstack/react-query';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { AdminDetailActions } from '@/components/admin/AdminDetailActions';
import { DetailCard, DetailField, ListStateView, PageHeader, StatusBadge } from '@/components/common';
import { ButtonLink } from '@/components/common/ButtonLink';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useResourceId } from '@/hooks/useRouteId';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { formatDate } from '@/lib/format-date';
import type { ApiEnvelope } from '@/types/api';
import { companyNavItems } from './nav';

interface JobDetail {
    id: number;
    title: string;
    description: string | null;
    location: string | null;
    employment_type: string | null;
    status: string | null;
    created_at: string | null;
}

export default function JobShow() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);
    const id = useResourceId();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['company', 'jobs', id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<JobDetail>>(`/v1/company/jobs/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader title="Job details" />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    {data && (
                        <div className="space-y-6">
                            <AdminDetailActions backHref="/company/jobs">
                                <ButtonLink href={`/company/jobs/${id}/edit`} size="sm">
                                    {t('common.edit')}
                                </ButtonLink>
                            </AdminDetailActions>
                            <DetailCard title={data.title}>
                                <DetailField label="Status" value={<StatusBadge status={data.status} />} />
                                <DetailField label="Location" value={data.location} />
                                <DetailField label="Type" value={data.employment_type} />
                                <DetailField label="Description" value={data.description} />
                                <DetailField label="Created" value={formatDate(data.created_at, true)} />
                            </DetailCard>
                        </div>
                    )}
                </ListStateView>
            </ConnectShell>
        </AuthGuard>
    );
}

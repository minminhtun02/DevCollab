import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { formatDate } from '@/lib/format-date';
import { useTranslation } from '@/hooks/useTranslation';
import { companyNavItems } from './nav';

interface ApplicationRow {
    id: number;
    status: string | null;
    created_at: string | null;
    job?: { title: string } | null;
    user?: { name: string; email: string } | null;
}

export default function Applications() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);
    const fetchApplications = useMemo(
        () => createApiDataSource<ApplicationRow>('/v1/company/job-applications'),
        [],
    );

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader title={t('company.menu.applications')} />
                <DataTable
                    fetchFunction={fetchApplications}
                    columns={[
                        linkedNameColumn<ApplicationRow>(t('jobApplications.applicant'), '/company/applications', (row) => row.user?.name ?? `#${row.id}`),
                        { key: 'job', header: t('menu.jobs'), render: (row) => row.job?.title ?? '—' },
                        { key: 'email', header: t('auth.email'), render: (row) => row.user?.email ?? '—' },
                        { key: 'status', header: t('common.status'), render: (row) => row.status ?? '—' },
                        { key: 'created_at', header: t('common.createdAt'), render: (row) => formatDate(row.created_at) },
                        resourceActionsColumn<ApplicationRow>(t, '/company/applications', { showEdit: false }),
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

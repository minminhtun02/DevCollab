import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { createHeaderAction, linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { formatDate } from '@/lib/format-date';
import { useTranslation } from '@/hooks/useTranslation';
import { companyNavItems } from './nav';

interface JobRow {
    id: number;
    title: string;
    location: string | null;
    employment_type: string | null;
    status: string | null;
    created_at: string | null;
}

export default function Jobs() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);
    const fetchJobs = useMemo(() => createApiDataSource<JobRow>('/v1/company/jobs'), []);

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader title={t('menu.jobs')} actions={createHeaderAction('/company/jobs/create', 'Post job')} />
                <DataTable
                    fetchFunction={fetchJobs}
                    columns={[
                        linkedNameColumn<JobRow>('Title', '/company/jobs', (row) => row.title),
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        { key: 'type', header: 'Type', render: (row) => row.employment_type ?? '—' },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                        { key: 'created_at', header: 'Created', render: (row) => formatDate(row.created_at) },
                        resourceActionsColumn<JobRow>(t, '/company/jobs', {}),
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

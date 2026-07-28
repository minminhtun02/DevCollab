import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
import { adminNavItems } from './nav';

interface JobRow {
    id: number;
    title: string;
    location: string | null;
    status: string | null;
    company_profile?: { company_name: string } | null;
}

export default function Jobs() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchJobs = useMemo(() => createApiDataSource<JobRow>('/v1/admin/jobs'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.jobs')} />
                <DataTable
                    fetchFunction={fetchJobs}
                    columns={[
                        linkedNameColumn<JobRow>('Title', '/admin/jobs', (row) => row.title),
                        {
                            key: 'company',
                            header: t('menu.companies'),
                            render: (row) => row.company_profile?.company_name ?? '—',
                        },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

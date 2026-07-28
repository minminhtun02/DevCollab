import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
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
            <AppShell portal="company" navItems={navItems} title={t.nav.jobs}>
                <PageHeader title={t.nav.jobs} />
                <DataTable
                    fetchFunction={fetchJobs}
                    columns={[
                        { key: 'title', header: 'Title', render: (row) => row.title },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        { key: 'type', header: 'Type', render: (row) => row.employment_type ?? '—' },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                        {
                            key: 'created_at',
                            header: 'Created',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

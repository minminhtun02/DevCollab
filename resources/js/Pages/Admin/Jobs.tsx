import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
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
            <AppShell portal="admin" navItems={navItems} title={t.nav.jobs}>
                <PageHeader title={t.nav.jobs} />
                <DataTable
                    fetchFunction={fetchJobs}
                    columns={[
                        { key: 'title', header: 'Title', render: (row) => row.title },
                        {
                            key: 'company',
                            header: t.nav.companies,
                            render: (row) => row.company_profile?.company_name ?? '—',
                        },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { webNavItems } from './nav';

interface ApplicationRow {
    id: number;
    status: string | null;
    created_at: string | null;
    job?: { title: string } | null;
}

export default function Applications() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchApplications = useMemo(
        () => createApiDataSource<ApplicationRow>('/v1/web/job-applications/me'),
        [],
    );

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.applications}>
                <PageHeader title={t.nav.applications} />
                <DataTable
                    fetchFunction={fetchApplications}
                    columns={[
                        {
                            key: 'job',
                            header: t.nav.jobs,
                            render: (row) => row.job?.title ?? '—',
                        },
                        {
                            key: 'status',
                            header: 'Status',
                            render: (row) => row.status ?? '—',
                        },
                        {
                            key: 'created_at',
                            header: 'Applied',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

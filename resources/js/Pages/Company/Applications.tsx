import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
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
            <AppShell portal="company" navItems={navItems} title={t.nav.applications}>
                <PageHeader title={t.nav.applications} />
                <DataTable
                    fetchFunction={fetchApplications}
                    columns={[
                        { key: 'job', header: t.nav.jobs, render: (row) => row.job?.title ?? '—' },
                        { key: 'applicant', header: 'Applicant', render: (row) => row.user?.name ?? '—' },
                        { key: 'email', header: t.auth.email, render: (row) => row.user?.email ?? '—' },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
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

import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface JobApplicationRow {
    id: number;
    status: string | null;
    created_at: string | null;
    job?: { title: string } | null;
    user?: { name: string; email: string } | null;
}

export default function JobApplications() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchApplications = useMemo(() => createApiDataSource<JobApplicationRow>('/v1/admin/job-applications'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title="Job Applications">
                <PageHeader title="Job Applications" />
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

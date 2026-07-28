import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/hooks/useTranslation';
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
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader title={t('webMenu.applications')} />
                <DataTable
                    fetchFunction={fetchApplications}
                    columns={[
                        {
                            key: 'job',
                            header: t('menu.jobs'),
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
            </ConnectShell>
        </AuthGuard>
    );
}

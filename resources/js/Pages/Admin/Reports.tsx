import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface ReportRow {
    id: number;
    reason: string;
    status: string | null;
    created_at: string | null;
    reporter?: { name: string } | null;
    reported_user?: { name: string } | null;
}

export default function Reports() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchReports = useMemo(() => createApiDataSource<ReportRow>('/v1/admin/reports'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title={t.nav.reports}>
                <PageHeader title={t.nav.reports} />
                <DataTable
                    fetchFunction={fetchReports}
                    columns={[
                        { key: 'reporter', header: 'Reporter', render: (row) => row.reporter?.name ?? '—' },
                        {
                            key: 'reported_user',
                            header: 'Reported user',
                            render: (row) => row.reported_user?.name ?? '—',
                        },
                        { key: 'reason', header: 'Reason', render: (row) => row.reason },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                        {
                            key: 'created_at',
                            header: 'Submitted',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

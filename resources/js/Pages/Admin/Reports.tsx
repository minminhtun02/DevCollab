import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
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
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.reports')} />
                <DataTable
                    fetchFunction={fetchReports}
                    columns={[
                        { key: 'reporter', header: 'Reporter', render: (row) => row.reporter?.name ?? '—' },
                        {
                            key: 'reported_user',
                            header: 'Reported user',
                            render: (row) => row.reported_user?.name ?? '—',
                        },
                        linkedNameColumn<ReportRow>('Reason', '/admin/reports', (row) => row.reason),
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                        {
                            key: 'created_at',
                            header: 'Submitted',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                        resourceActionsColumn<ReportRow>(t, '/admin/reports', { showEdit: false }),
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

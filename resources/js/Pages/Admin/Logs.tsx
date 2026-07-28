import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
import { adminNavItems } from './nav';

interface LogRow {
    id: number;
    action: string;
    subject_type: string | null;
    subject_id: number | null;
    created_at: string | null;
    admin?: { name: string } | null;
}

export default function Logs() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchLogs = useMemo(() => createApiDataSource<LogRow>('/v1/admin/logs'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.logs')} />
                <DataTable
                    fetchFunction={fetchLogs}
                    columns={[
                        { key: 'admin', header: 'Admin', render: (row) => row.admin?.name ?? '—' },
                        { key: 'action', header: 'Action', render: (row) => row.action },
                        { key: 'subject_type', header: 'Subject', render: (row) => row.subject_type ?? '—' },
                        { key: 'subject_id', header: 'Subject ID', render: (row) => row.subject_id ?? '—' },
                        {
                            key: 'created_at',
                            header: 'When',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleString() : '—',
                        },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

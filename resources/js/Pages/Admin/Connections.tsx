import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
import { adminNavItems } from './nav';

interface ConnectionRow {
    id: number;
    created_at: string | null;
    user_one?: { name: string } | null;
    user_two?: { name: string } | null;
}

export default function Connections() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchConnections = useMemo(() => createApiDataSource<ConnectionRow>('/v1/admin/connections'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.connections')} />
                <DataTable
                    fetchFunction={fetchConnections}
                    columns={[
                        { key: 'user_one', header: 'User one', render: (row) => row.user_one?.name ?? '—' },
                        { key: 'user_two', header: 'User two', render: (row) => row.user_two?.name ?? '—' },
                        {
                            key: 'created_at',
                            header: 'Connected',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/hooks/useTranslation';
import { webNavItems } from './nav';

interface ConnectionRow {
    id: number;
    created_at: string | null;
    user_one?: { name: string } | null;
    user_two?: { name: string } | null;
}

export default function Connections() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchConnections = useMemo(() => createApiDataSource<ConnectionRow>('/v1/web/connections'), []);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader title={t('webMenu.connections')} />
                <DataTable
                    fetchFunction={fetchConnections}
                    columns={[
                        {
                            key: 'user_one',
                            header: 'User one',
                            render: (row) => row.user_one?.name ?? '—',
                        },
                        {
                            key: 'user_two',
                            header: 'User two',
                            render: (row) => row.user_two?.name ?? '—',
                        },
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

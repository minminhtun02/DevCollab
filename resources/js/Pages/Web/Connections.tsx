import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
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
            <AppShell portal="web" navItems={navItems} title={t.nav.connections}>
                <PageHeader title={t.nav.connections} />
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
            </AppShell>
        </AuthGuard>
    );
}

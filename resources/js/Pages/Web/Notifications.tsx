import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { webNavItems } from './nav';

interface NotificationRow {
    id: number;
    type: string;
    read_at: string | null;
    created_at: string | null;
}

export default function Notifications() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchNotifications = useMemo(() => createApiDataSource<NotificationRow>('/v1/web/notifications'), []);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.notifications}>
                <PageHeader title={t.nav.notifications} />
                <DataTable
                    fetchFunction={fetchNotifications}
                    columns={[
                        {
                            key: 'type',
                            header: 'Type',
                            render: (row) => row.type,
                        },
                        {
                            key: 'read_at',
                            header: 'Read',
                            render: (row) => (row.read_at ? new Date(row.read_at).toLocaleString() : 'Unread'),
                        },
                        {
                            key: 'created_at',
                            header: 'Received',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleString() : '—',
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

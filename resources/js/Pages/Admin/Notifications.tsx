import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/hooks/useTranslation';
import { adminNavItems } from './nav';

interface NotificationRow {
    id: number;
    type: string;
    created_at: string | null;
}

export default function Notifications() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchNotifications = useMemo(() => createApiDataSource<NotificationRow>('/v1/admin/notifications'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.notifications')} />
                <DataTable
                    fetchFunction={fetchNotifications}
                    columns={[
                        { key: 'type', header: 'Type', render: (row) => row.type },
                        {
                            key: 'created_at',
                            header: 'Sent',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleString() : '—',
                        },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

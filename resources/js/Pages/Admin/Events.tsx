import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
import { adminNavItems } from './nav';

interface EventRow {
    id: number;
    title: string;
    location: string | null;
    starts_at: string | null;
    is_active: boolean;
    creator?: { name: string } | null;
}

export default function Events() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchEvents = useMemo(() => createApiDataSource<EventRow>('/v1/admin/events'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.events')} />
                <DataTable
                    fetchFunction={fetchEvents}
                    columns={[
                        { key: 'title', header: 'Title', render: (row) => row.title },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        {
                            key: 'starts_at',
                            header: 'Starts',
                            render: (row) =>
                                row.starts_at ? new Date(row.starts_at).toLocaleString() : '—',
                        },
                        { key: 'creator', header: 'Creator', render: (row) => row.creator?.name ?? '—' },
                        { key: 'active', header: 'Active', render: (row) => (row.is_active ? 'Yes' : 'No') },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

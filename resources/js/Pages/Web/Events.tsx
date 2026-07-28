import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/hooks/useTranslation';
import { webNavItems } from './nav';

interface EventRow {
    id: number;
    title: string;
    location: string | null;
    starts_at: string | null;
    ends_at: string | null;
    is_active: boolean;
}

export default function Events() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchEvents = useMemo(() => createApiDataSource<EventRow>('/v1/web/events'), []);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader title={t('menu.events')} />
                <DataTable
                    fetchFunction={fetchEvents}
                    columns={[
                        {
                            key: 'title',
                            header: 'Title',
                            render: (row) => row.title,
                        },
                        {
                            key: 'location',
                            header: 'Location',
                            render: (row) => row.location ?? '—',
                        },
                        {
                            key: 'starts_at',
                            header: 'Starts',
                            render: (row) =>
                                row.starts_at ? new Date(row.starts_at).toLocaleString() : '—',
                        },
                        {
                            key: 'ends_at',
                            header: 'Ends',
                            render: (row) => (row.ends_at ? new Date(row.ends_at).toLocaleString() : '—'),
                        },
                        {
                            key: 'is_active',
                            header: 'Active',
                            render: (row) => (row.is_active ? 'Yes' : 'No'),
                        },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

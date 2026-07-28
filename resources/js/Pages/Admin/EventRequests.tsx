import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface EventRequestRow {
    id: number;
    title: string;
    location: string | null;
    status: string | null;
    preferred_date: string | null;
    user?: { name: string } | null;
}

export default function EventRequests() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchEventRequests = useMemo(() => createApiDataSource<EventRequestRow>('/v1/admin/event-requests'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title="Event Requests">
                <PageHeader title="Event Requests" />
                <DataTable
                    fetchFunction={fetchEventRequests}
                    columns={[
                        { key: 'title', header: 'Title', render: (row) => row.title },
                        { key: 'user', header: t.auth.name, render: (row) => row.user?.name ?? '—' },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        {
                            key: 'preferred_date',
                            header: 'Preferred date',
                            render: (row) =>
                                row.preferred_date ? new Date(row.preferred_date).toLocaleDateString() : '—',
                        },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

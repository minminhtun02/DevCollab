import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface UserRow {
    id: number;
    name: string;
    email: string;
    role: string | null;
    status: string | null;
    created_at: string | null;
}

export default function Users() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchUsers = useMemo(() => createApiDataSource<UserRow>('/v1/admin/users'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title={t.nav.users}>
                <PageHeader title={t.nav.users} />
                <DataTable
                    fetchFunction={fetchUsers}
                    columns={[
                        { key: 'name', header: t.auth.name, render: (row) => row.name },
                        { key: 'email', header: t.auth.email, render: (row) => row.email },
                        { key: 'role', header: 'Role', render: (row) => row.role ?? '—' },
                        { key: 'status', header: 'Status', render: (row) => row.status ?? '—' },
                        {
                            key: 'created_at',
                            header: 'Joined',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

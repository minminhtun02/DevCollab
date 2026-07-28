import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
import { adminNavItems } from './nav';

interface DeveloperProfileRow {
    id: number;
    headline: string | null;
    location: string | null;
    is_public: boolean;
    user?: { name: string; email: string } | null;
}

export default function DeveloperProfiles() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchProfiles = useMemo(() => createApiDataSource<DeveloperProfileRow>('/v1/admin/developer-profiles'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.profiles')} />
                <DataTable
                    fetchFunction={fetchProfiles}
                    columns={[
                        { key: 'name', header: t('users.name'), render: (row) => row.user?.name ?? '—' },
                        { key: 'email', header: t('auth.email'), render: (row) => row.user?.email ?? '—' },
                        { key: 'headline', header: 'Headline', render: (row) => row.headline ?? '—' },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                        { key: 'public', header: 'Public', render: (row) => (row.is_public ? 'Yes' : 'No') },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

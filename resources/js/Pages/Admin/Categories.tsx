import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface CategoryRow {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
}

export default function Categories() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchCategories = useMemo(() => createApiDataSource<CategoryRow>('/v1/admin/categories'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title={t.nav.categories}>
                <PageHeader title={t.nav.categories} />
                <DataTable
                    fetchFunction={fetchCategories}
                    columns={[
                        { key: 'name', header: 'Name', render: (row) => row.name },
                        { key: 'slug', header: 'Slug', render: (row) => row.slug },
                        { key: 'active', header: 'Active', render: (row) => (row.is_active ? 'Yes' : 'No') },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

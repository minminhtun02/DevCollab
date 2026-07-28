import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface SkillRow {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    category?: { name: string } | null;
}

export default function Skills() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchSkills = useMemo(() => createApiDataSource<SkillRow>('/v1/admin/skills'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title={t.nav.skills}>
                <PageHeader title={t.nav.skills} />
                <DataTable
                    fetchFunction={fetchSkills}
                    columns={[
                        { key: 'name', header: 'Name', render: (row) => row.name },
                        { key: 'category', header: t.nav.categories, render: (row) => row.category?.name ?? '—' },
                        { key: 'slug', header: 'Slug', render: (row) => row.slug },
                        { key: 'active', header: 'Active', render: (row) => (row.is_active ? 'Yes' : 'No') },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

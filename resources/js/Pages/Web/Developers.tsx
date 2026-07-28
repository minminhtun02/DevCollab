import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { webNavItems } from './nav';

interface DeveloperRow {
    id: number;
    headline: string | null;
    location: string | null;
    experience_years: number | null;
    user?: { name: string; email: string } | null;
}

export default function Developers() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchDevelopers = useMemo(() => createApiDataSource<DeveloperRow>('/v1/web/developers'), []);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.developers}>
                <PageHeader title={t.nav.developers} />
                <DataTable
                    fetchFunction={fetchDevelopers}
                    columns={[
                        {
                            key: 'name',
                            header: t.auth.name,
                            render: (row) => row.user?.name ?? '—',
                        },
                        {
                            key: 'headline',
                            header: 'Headline',
                            render: (row) => row.headline ?? '—',
                        },
                        {
                            key: 'location',
                            header: 'Location',
                            render: (row) => row.location ?? '—',
                        },
                        {
                            key: 'experience',
                            header: 'Experience',
                            render: (row) => (row.experience_years != null ? `${row.experience_years} yrs` : '—'),
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

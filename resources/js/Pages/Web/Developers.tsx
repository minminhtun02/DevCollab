import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/hooks/useTranslation';
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
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader title={t('webMenu.developers')} />
                <DataTable
                    fetchFunction={fetchDevelopers}
                    columns={[
                        {
                            key: 'name',
                            header: t('users.name'),
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
            </ConnectShell>
        </AuthGuard>
    );
}

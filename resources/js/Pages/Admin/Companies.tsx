import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { adminNavItems } from './nav';

interface CompanyRow {
    id: number;
    company_name: string;
    industry: string | null;
    location: string | null;
    user?: { name: string; email: string } | null;
}

export default function Companies() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const fetchCompanies = useMemo(() => createApiDataSource<CompanyRow>('/v1/admin/companies'), []);

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <AppShell portal="admin" navItems={navItems} title={t.nav.companies}>
                <PageHeader title={t.nav.companies} />
                <DataTable
                    fetchFunction={fetchCompanies}
                    columns={[
                        { key: 'company_name', header: 'Company', render: (row) => row.company_name },
                        { key: 'contact', header: 'Contact', render: (row) => row.user?.name ?? '—' },
                        { key: 'email', header: t.auth.email, render: (row) => row.user?.email ?? '—' },
                        { key: 'industry', header: 'Industry', render: (row) => row.industry ?? '—' },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

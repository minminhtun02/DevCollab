import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
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
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.companies')} />
                <DataTable
                    fetchFunction={fetchCompanies}
                    columns={[
                        { key: 'company_name', header: 'Company', render: (row) => row.company_name },
                        { key: 'contact', header: 'Contact', render: (row) => row.user?.name ?? '—' },
                        { key: 'email', header: t('auth.email'), render: (row) => row.user?.email ?? '—' },
                        { key: 'industry', header: 'Industry', render: (row) => row.industry ?? '—' },
                        { key: 'location', header: 'Location', render: (row) => row.location ?? '—' },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

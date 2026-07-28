import { Link } from '@inertiajs/react';
import { useMemo } from 'react';
import { AppShell } from '@/components/layouts/AppShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/lib/i18n';
import { webNavItems } from './nav';

interface JobRow {
    id: number;
    title: string;
    location: string | null;
    employment_type: string | null;
    status: string | null;
    company_profile?: { company_name: string } | null;
}

export default function Jobs() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchJobs = useMemo(() => createApiDataSource<JobRow>('/v1/web/jobs'), []);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.jobs}>
                <PageHeader title={t.nav.jobs} />
                <DataTable
                    fetchFunction={fetchJobs}
                    columns={[
                        {
                            key: 'title',
                            header: 'Title',
                            render: (row) => (
                                <Link href={`/app/jobs/${row.id}`} className="font-medium text-indigo-600 hover:underline">
                                    {row.title}
                                </Link>
                            ),
                        },
                        {
                            key: 'company',
                            header: 'Company',
                            render: (row) => row.company_profile?.company_name ?? '—',
                        },
                        {
                            key: 'location',
                            header: 'Location',
                            render: (row) => row.location ?? '—',
                        },
                        {
                            key: 'type',
                            header: 'Type',
                            render: (row) => row.employment_type ?? '—',
                        },
                        {
                            key: 'status',
                            header: 'Status',
                            render: (row) => row.status ?? '—',
                        },
                    ]}
                />
            </AppShell>
        </AuthGuard>
    );
}

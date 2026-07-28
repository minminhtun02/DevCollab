import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function CompanyShow() {
    return (
        <AdminResourceShowInner
            title="Company Details"
            backHref="/admin/companies"
            apiPath="/v1/admin/companies"
            queryKey={['admin', 'companies']}
            editable
            fields={[
                { label: 'Company', key: 'company_name' },
                { label: 'Industry', key: 'industry' },
                { label: 'Location', key: 'location' },
                { label: 'Verified', key: 'is_verified' },
                {
                    label: 'Email',
                    render: (data) => (data.user as { email?: string } | undefined)?.email ?? '—',
                },
            ]}
        />
    );
}

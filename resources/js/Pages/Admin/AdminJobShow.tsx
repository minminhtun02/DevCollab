import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function AdminJobShow() {
    return (
        <AdminResourceShowInner
            title="Job Details"
            backHref="/admin/jobs"
            apiPath="/v1/admin/jobs"
            queryKey={['admin', 'jobs']}
            fields={[
                { label: 'Title', key: 'title' },
                { label: 'Status', key: 'status' },
                { label: 'Location', key: 'location' },
                { label: 'Employment type', key: 'employment_type' },
                { label: 'Description', key: 'description' },
                { label: 'Created', key: 'created_at' },
                { label: 'Company', render: (data) => (data.company_profile as { company_name?: string } | undefined)?.company_name ?? '—' },
            ]}
        />
    );
}

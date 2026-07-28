import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function JobApplicationShow() {
    return (
        <AdminResourceShowInner
            title="Application Details"
            backHref="/admin/job-applications"
            apiPath="/v1/admin/job-applications"
            queryKey={['admin', 'job-applications']}
            fields={[
                { label: 'Status', key: 'status' },
                { label: 'Cover letter', key: 'cover_letter' },
                { label: 'Created', key: 'created_at' },
                { label: 'Job', render: (data) => (data.job as { title?: string } | undefined)?.title ?? '—' },
                { label: 'Applicant', render: (data) => (data.user as { name?: string; email?: string } | undefined)?.name ?? '—' },
            ]}
        />
    );
}

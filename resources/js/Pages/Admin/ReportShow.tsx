import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function ReportShow() {
    return (
        <AdminResourceShowInner
            title="Report Details"
            backHref="/admin/reports"
            apiPath="/v1/admin/reports"
            queryKey={['admin', 'reports']}
            fields={[
                { label: 'Reason', key: 'reason' },
                { label: 'Status', key: 'status' },
                { label: 'Description', key: 'description' },
                { label: 'Created', key: 'created_at' },
                {
                    label: 'Reporter',
                    render: (data) => (data.reporter as { name?: string } | undefined)?.name ?? '—',
                },
            ]}
        />
    );
}

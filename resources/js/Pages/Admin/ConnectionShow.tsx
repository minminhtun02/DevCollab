import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function ConnectionShow() {
    return (
        <AdminResourceShowInner
            title="Connection Details"
            backHref="/admin/connections"
            apiPath="/v1/admin/connections"
            queryKey={['admin', 'connections']}
            fields={[
                { label: 'Status', key: 'status' },
                { label: 'Created', key: 'created_at' },
                {
                    label: 'User A',
                    render: (data) => (data.user_a as { name?: string } | undefined)?.name ?? '—',
                },
                {
                    label: 'User B',
                    render: (data) => (data.user_b as { name?: string } | undefined)?.name ?? '—',
                },
            ]}
        />
    );
}

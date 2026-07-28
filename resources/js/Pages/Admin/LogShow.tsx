import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function LogShow() {
    return (
        <AdminResourceShowInner
            title="Log Details"
            backHref="/admin/logs"
            apiPath="/v1/admin/logs"
            queryKey={['admin', 'logs']}
            fields={[
                { label: 'Action', key: 'action' },
                { label: 'Subject', key: 'subject_type' },
                { label: 'Subject ID', key: 'subject_id' },
                { label: 'IP', key: 'ip_address' },
                { label: 'Created', key: 'created_at' },
                {
                    label: 'Admin',
                    render: (data) => (data.admin as { name?: string } | undefined)?.name ?? '—',
                },
            ]}
        />
    );
}

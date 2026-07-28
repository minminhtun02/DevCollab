import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function EventRequestShow() {
    return (
        <AdminResourceShowInner
            title="Event Request"
            backHref="/admin/event-requests"
            apiPath="/v1/admin/event-requests"
            queryKey={['admin', 'event-requests']}
            fields={[
                { label: 'Title', key: 'title' },
                { label: 'Status', key: 'status' },
                { label: 'Description', key: 'description' },
                { label: 'Requested by', render: (data) => (data.user as { name?: string } | undefined)?.name ?? '—' },
            ]}
        />
    );
}

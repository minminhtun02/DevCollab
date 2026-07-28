import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function EventShow() {
    return (
        <AdminResourceShowInner
            title="Event Details"
            backHref="/admin/events"
            apiPath="/v1/admin/events"
            queryKey={['admin', 'events']}
            editable
            fields={[
                { label: 'Title', key: 'title' },
                { label: 'Status', key: 'status' },
                { label: 'Location', key: 'location' },
                { label: 'Starts at', key: 'starts_at' },
                { label: 'Description', key: 'description' },
            ]}
        />
    );
}

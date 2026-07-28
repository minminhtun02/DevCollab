import AdminResourceShowInner from '@/components/admin/AdminResourceShow';

export default function DeveloperProfileShow() {
    return (
        <AdminResourceShowInner
            title="Developer Profile"
            backHref="/admin/developer-profiles"
            apiPath="/v1/admin/developer-profiles"
            queryKey={['admin', 'developer-profiles']}
            editable
            fields={[
                { label: 'Headline', key: 'headline' },
                { label: 'Location', key: 'location' },
                { label: 'Public', key: 'is_public' },
                { label: 'Bio', key: 'bio' },
                { label: 'Developer', render: (data) => (data.user as { name?: string; email?: string } | undefined)?.name ?? '—' },
            ]}
        />
    );
}

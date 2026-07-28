import { useMemo } from 'react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { useTranslation } from '@/hooks/useTranslation';
import { webNavItems } from './nav';

interface ConversationRow {
    id: number;
    last_message_at: string | null;
    created_at: string | null;
    users?: { name: string }[] | null;
}

export default function Messages() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);
    const fetchConversations = useMemo(() => createApiDataSource<ConversationRow>('/v1/web/conversations'), []);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader title={t('webMenu.messages')} />
                <DataTable
                    fetchFunction={fetchConversations}
                    columns={[
                        {
                            key: 'participants',
                            header: 'Participants',
                            render: (row) => row.users?.map((u) => u.name).join(', ') ?? '—',
                        },
                        {
                            key: 'last_message_at',
                            header: 'Last message',
                            render: (row) =>
                                row.last_message_at
                                    ? new Date(row.last_message_at).toLocaleString()
                                    : '—',
                        },
                        {
                            key: 'created_at',
                            header: 'Started',
                            render: (row) =>
                                row.created_at ? new Date(row.created_at).toLocaleDateString() : '—',
                        },
                    ]}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

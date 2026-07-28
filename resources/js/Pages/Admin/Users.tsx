import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { ConfirmDialog, DataTable, PageHeader, StatusBadge } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { createHeaderAction, linkedNameColumn, resourceActionsColumn } from '@/lib/admin-table';
import { formatDate } from '@/lib/format-date';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { adminNavItems } from './nav';

interface UserRow {
    id: number;
    name: string;
    email: string;
    role: string | null;
    status: string | null;
    created_at: string | null;
}

export default function Users() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const [refresh, setRefresh] = useState(0);
    const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
    const fetchUsers = useMemo(() => createApiDataSource<UserRow>('/v1/admin/users'), []);

    const deleteMutation = useMutation({
        mutationFn: (id: number) => api.delete(`/v1/admin/users/${id}`),
        onSuccess: () => {
            toast.success(t('users.deleted'));
            setDeleteTarget(null);
            setRefresh((value) => value + 1);
        },
        onError: () => toast.error(t('users.deleteFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.users')} />
                <DataTable
                    refreshTrigger={refresh}
                    fetchFunction={fetchUsers}
                    columns={[
                        linkedNameColumn<UserRow>(t('users.name'), '/admin/users'),
                        { key: 'email', header: t('users.email'), render: (row) => row.email },
                        { key: 'role', header: t('users.role'), render: (row) => <span className="capitalize">{row.role ?? '—'}</span> },
                        { key: 'status', header: t('users.status'), render: (row) => <StatusBadge status={row.status} /> },
                        { key: 'created_at', header: t('users.joined'), render: (row) => formatDate(row.created_at) },
                        resourceActionsColumn<UserRow>(t, '/admin/users', {
                            onDelete: (row) => setDeleteTarget(row),
                        }),
                    ]}
                />
                <ConfirmDialog
                    open={Boolean(deleteTarget)}
                    title={t('users.deleteTitle')}
                    description={t('users.deleteDescription')}
                    confirmLabel={t('common.delete')}
                    cancelLabel={t('common.cancel')}
                    destructive
                    loading={deleteMutation.isPending}
                    onCancel={() => setDeleteTarget(null)}
                    onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { ConfirmDialog, DataTable, PageHeader } from '@/components/common';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { createApiDataSource } from '@/lib/api-data-source';
import { createHeaderAction, resourceActionsColumn } from '@/lib/admin-table';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { adminNavItems } from './nav';

interface CategoryRow {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
}

export default function Categories() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const [refresh, setRefresh] = useState(0);
    const [deleteTarget, setDeleteTarget] = useState<CategoryRow | null>(null);
    const fetchCategories = useMemo(() => createApiDataSource<CategoryRow>('/v1/admin/categories'), []);

    const deleteMutation = useMutation({
        mutationFn: (id: number) => api.delete(`/v1/admin/categories/${id}`),
        onSuccess: () => {
            toast.success(t('categories.deleted'));
            setDeleteTarget(null);
            setRefresh((value) => value + 1);
        },
        onError: () => toast.error(t('categories.deleteFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader
                    title={t('menu.categories')}
                    actions={createHeaderAction('/admin/categories/create', t('categories.create'))}
                />
                <DataTable
                    refreshTrigger={refresh}
                    fetchFunction={fetchCategories}
                    columns={[
                        {
                            key: 'name',
                            header: t('categories.name'),
                            render: (row) => (
                                <a href={`/admin/categories/${row.id}/edit`} className="font-medium text-primary hover:underline">
                                    {row.name}
                                </a>
                            ),
                        },
                        { key: 'slug', header: t('categories.slug'), render: (row) => row.slug },
                        { key: 'active', header: t('common.status'), render: (row) => (row.is_active ? t('common.yes') : t('common.no')) },
                        resourceActionsColumn<CategoryRow>(t, '/admin/categories', {
                            showView: false,
                            onDelete: (row) => setDeleteTarget(row),
                        }),
                    ]}
                />
                <ConfirmDialog
                    open={Boolean(deleteTarget)}
                    title={t('categories.deleteTitle')}
                    description={t('categories.deleteDescription')}
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

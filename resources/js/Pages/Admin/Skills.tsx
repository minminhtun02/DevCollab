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

interface SkillRow {
    id: number;
    name: string;
    slug: string;
    category?: { name: string } | null;
}

export default function Skills() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const [refresh, setRefresh] = useState(0);
    const [deleteTarget, setDeleteTarget] = useState<SkillRow | null>(null);
    const fetchSkills = useMemo(() => createApiDataSource<SkillRow>('/v1/admin/skills'), []);

    const deleteMutation = useMutation({
        mutationFn: (id: number) => api.delete(`/v1/admin/skills/${id}`),
        onSuccess: () => {
            toast.success(t('skills.deleted'));
            setDeleteTarget(null);
            setRefresh((value) => value + 1);
        },
        onError: () => toast.error(t('skills.deleteFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('menu.skills')} actions={createHeaderAction('/admin/skills/create', t('skills.create'))} />
                <DataTable
                    refreshTrigger={refresh}
                    fetchFunction={fetchSkills}
                    columns={[
                        {
                            key: 'name',
                            header: t('skills.name'),
                            render: (row) => (
                                <a href={`/admin/skills/${row.id}/edit`} className="font-medium text-primary hover:underline">
                                    {row.name}
                                </a>
                            ),
                        },
                        { key: 'category', header: t('skills.category'), render: (row) => row.category?.name ?? '—' },
                        { key: 'slug', header: t('skills.slug'), render: (row) => row.slug },
                        resourceActionsColumn<SkillRow>(t, '/admin/skills', {
                            showView: false,
                            onDelete: (row) => setDeleteTarget(row),
                        }),
                    ]}
                />
                <ConfirmDialog
                    open={Boolean(deleteTarget)}
                    title={t('skills.deleteTitle')}
                    description={t('skills.deleteDescription')}
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

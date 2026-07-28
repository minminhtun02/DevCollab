import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ban, Pencil, ShieldCheck } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminDetailActions } from '@/components/admin/AdminDetailActions';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { ConfirmDialog, DetailCard, DetailField, ListStateView, PageHeader, StatusBadge } from '@/components/common';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useResourceId } from '@/hooks/useRouteId';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { formatDate } from '@/lib/format-date';
import type { ApiEnvelope } from '@/types/api';
import { adminNavItems } from './nav';

interface UserDetail {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    role: string | null;
    status: string | null;
    created_at: string | null;
}

export default function UserShow({ id: idProp }: { id?: string | number }) {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const id = useResourceId(idProp);
    const queryClient = useQueryClient();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'users', id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<UserDetail>>(`/v1/admin/users/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    const invalidate = () => void queryClient.invalidateQueries({ queryKey: ['admin', 'users', id] });

    const banMutation = useMutation({
        mutationFn: () => api.post(`/v1/admin/users/${id}/ban`, { reason: 'Banned by admin' }),
        onSuccess: () => {
            toast.success(t('users.banned'));
            invalidate();
        },
    });

    const unbanMutation = useMutation({
        mutationFn: () => api.post(`/v1/admin/users/${id}/unban`),
        onSuccess: () => {
            toast.success(t('users.unbanned'));
            invalidate();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => api.delete(`/v1/admin/users/${id}`),
        onSuccess: () => {
            toast.success(t('users.deleted'));
            router.visit('/admin/users');
        },
        onError: () => toast.error(t('users.deleteFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('users.detailTitle')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    {data && (
                        <div className="space-y-6">
                            <AdminDetailActions backHref="/admin/users">
                                <ButtonLink href={`/admin/users/${id}/edit`} size="sm">
                                    <Pencil className="h-4 w-4" />
                                    {t('common.edit')}
                                </ButtonLink>
                                {data.status === 'banned' ? (
                                    <Button size="sm" variant="outline" disabled={unbanMutation.isPending} onClick={() => unbanMutation.mutate()}>
                                        <ShieldCheck className="h-4 w-4" />
                                        {t('users.unban')}
                                    </Button>
                                ) : (
                                    <Button size="sm" variant="destructive" disabled={banMutation.isPending} onClick={() => banMutation.mutate()}>
                                        <Ban className="h-4 w-4" />
                                        {t('users.ban')}
                                    </Button>
                                )}
                                <Button size="sm" variant="outline" className="text-destructive" onClick={() => setDeleteOpen(true)}>
                                    {t('common.delete')}
                                </Button>
                            </AdminDetailActions>

                            <DetailCard title={data.name}>
                                <DetailField label={t('users.email')} value={data.email} />
                                <DetailField label={t('users.role')} value={<span className="capitalize">{data.role}</span>} />
                                <DetailField label={t('users.status')} value={<StatusBadge status={data.status} />} />
                                <DetailField label={t('users.joined')} value={formatDate(data.created_at, true)} />
                                {data.phone ? <DetailField label="Phone" value={data.phone} /> : null}
                            </DetailCard>
                        </div>
                    )}
                </ListStateView>

                <ConfirmDialog
                    open={deleteOpen}
                    title={t('users.deleteTitle')}
                    description={t('users.deleteDescription')}
                    confirmLabel={t('common.delete')}
                    cancelLabel={t('common.cancel')}
                    destructive
                    loading={deleteMutation.isPending}
                    onCancel={() => setDeleteOpen(false)}
                    onConfirm={() => deleteMutation.mutate()}
                />
            </ConnectShell>
        </AuthGuard>
    );
}

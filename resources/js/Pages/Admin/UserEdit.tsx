import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminDetailActions } from '@/components/admin/AdminDetailActions';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { ListStateView, PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useResourceId } from '@/hooks/useRouteId';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api';
import { adminNavItems } from './nav';

interface UserDetail {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    role: string | null;
    status: string | null;
}

export default function UserEdit({ id: idProp }: { id?: string | number }) {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const id = useResourceId(idProp);
    const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'developer', status: 'active' });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'users', id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<UserDetail>>(`/v1/admin/users/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name,
                email: data.email,
                phone: data.phone ?? '',
                role: data.role ?? 'developer',
                status: data.status ?? 'active',
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: () => api.put(`/v1/admin/users/${id}`, form),
        onSuccess: () => {
            toast.success(t('users.updated'));
            router.visit(`/admin/users/${id}`);
        },
        onError: () => toast.error(t('users.updateFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('users.editTitle')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    <div className="mx-auto max-w-xl space-y-6">
                        <AdminDetailActions backHref={`/admin/users/${id}`} />
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('users.name')}</Label>
                                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('users.email')}</Label>
                                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">{t('users.role')}</Label>
                                    <select
                                        id="role"
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    >
                                        <option value="developer">Developer</option>
                                        <option value="company">Company</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">{t('users.status')}</Label>
                                    <select
                                        id="status"
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="banned">Banned</option>
                                    </select>
                                </div>
                                <Button className="w-full" disabled={saveMutation.isPending} onClick={() => saveMutation.mutate()}>
                                    {saveMutation.isPending ? t('common.saving') : t('common.save')}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </ListStateView>
            </ConnectShell>
        </AuthGuard>
    );
}

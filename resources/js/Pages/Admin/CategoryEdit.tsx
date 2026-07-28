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

interface CategoryDetail {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    is_active: boolean;
}

async function fetchCategoryById(id: string): Promise<CategoryDetail> {
    const response = await api.get<ApiEnvelope<CategoryDetail[]>>('/v1/admin/categories', {
        params: { per_page: 200 },
    });
    const item = (response.data.data ?? []).find((category) => String(category.id) === id);
    if (!item) {
        throw new Error('Category not found');
    }
    return item;
}

export default function CategoryEdit() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const id = useResourceId();
    const [form, setForm] = useState({ name: '', slug: '', description: '', is_active: true });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'categories', id, 'edit'],
        queryFn: () => fetchCategoryById(id),
        enabled: Boolean(id),
    });

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name,
                slug: data.slug,
                description: data.description ?? '',
                is_active: data.is_active,
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: () => api.put(`/v1/admin/categories/${id}`, form),
        onSuccess: () => {
            toast.success(t('categories.updated'));
            router.visit('/admin/categories');
        },
        onError: () => toast.error(t('categories.updateFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('categories.editTitle')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    <div className="mx-auto max-w-xl space-y-6">
                        <AdminDetailActions backHref="/admin/categories" />
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('categories.name')}</Label>
                                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">{t('categories.slug')}</Label>
                                    <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                                    Active
                                </label>
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

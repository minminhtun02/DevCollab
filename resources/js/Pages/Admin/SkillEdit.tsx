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

interface SkillDetail {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    is_active: boolean;
}

interface CategoryOption {
    id: number;
    name: string;
}

export default function SkillEdit() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const id = useResourceId();
    const [form, setForm] = useState({ category_id: '', name: '', slug: '', is_active: true });

    const { data: categories } = useQuery({
        queryKey: ['admin', 'categories', 'options'],
        queryFn: async () => {
            const response = await api.get<ApiEnvelope<CategoryOption[]>>('/v1/admin/categories', { params: { per_page: 200 } });
            return response.data.data ?? [];
        },
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'skills', id, 'edit'],
        queryFn: async () => {
            const response = await api.get<ApiEnvelope<SkillDetail[]>>('/v1/admin/skills', { params: { per_page: 200 } });
            const item = (response.data.data ?? []).find((skill) => String(skill.id) === id);
            if (!item) throw new Error('Skill not found');
            return item;
        },
        enabled: Boolean(id),
    });

    useEffect(() => {
        if (data) {
            setForm({
                category_id: String(data.category_id),
                name: data.name,
                slug: data.slug,
                is_active: data.is_active,
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: () =>
            api.put(`/v1/admin/skills/${id}`, {
                ...form,
                category_id: Number(form.category_id),
            }),
        onSuccess: () => {
            toast.success(t('skills.updated'));
            router.visit('/admin/skills');
        },
        onError: () => toast.error(t('skills.updateFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('skills.editTitle')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    <div className="mx-auto max-w-xl space-y-6">
                        <AdminDetailActions backHref="/admin/skills" />
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">{t('skills.category')}</Label>
                                    <select
                                        id="category"
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                                        value={form.category_id}
                                        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                                    >
                                        {categories?.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('skills.name')}</Label>
                                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">{t('skills.slug')}</Label>
                                    <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
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

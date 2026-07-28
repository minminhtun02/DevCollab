import { useMutation } from '@tanstack/react-query';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminDetailActions } from '@/components/admin/AdminDetailActions';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { adminNavItems } from './nav';

export default function CategoryCreate() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const [form, setForm] = useState({ name: '', slug: '', description: '', is_active: true });

    const saveMutation = useMutation({
        mutationFn: () => api.post('/v1/admin/categories', form),
        onSuccess: () => {
            toast.success(t('categories.created'));
            router.visit('/admin/categories');
        },
        onError: () => toast.error(t('categories.createFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('categories.createTitle')} />
                <div className="mx-auto max-w-xl space-y-6">
                    <AdminDetailActions backHref="/admin/categories" />
                    <Card>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('categories.name')}</Label>
                                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
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
                                {saveMutation.isPending ? t('common.saving') : t('categories.create')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </ConnectShell>
        </AuthGuard>
    );
}

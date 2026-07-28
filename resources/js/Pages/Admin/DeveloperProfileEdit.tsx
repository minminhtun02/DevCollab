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

interface ProfileDetail {
    id: number;
    headline: string | null;
    bio: string | null;
    location: string | null;
    is_public: boolean;
}

export default function DeveloperProfileEdit() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const id = useResourceId();
    const [form, setForm] = useState({ headline: '', bio: '', location: '', is_public: true });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'developer-profiles', id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<ProfileDetail>>(`/v1/admin/developer-profiles/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    useEffect(() => {
        if (data) {
            setForm({
                headline: data.headline ?? '',
                bio: data.bio ?? '',
                location: data.location ?? '',
                is_public: data.is_public,
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: () => api.put(`/v1/admin/developer-profiles/${id}`, form),
        onSuccess: () => {
            toast.success(t('profiles.updated'));
            router.visit(`/admin/developer-profiles/${id}`);
        },
        onError: () => toast.error(t('profiles.updateFailed')),
    });

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={t('profiles.editTitle')} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    <div className="mx-auto max-w-xl space-y-6">
                        <AdminDetailActions backHref={`/admin/developer-profiles/${id}`} />
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="headline">{t('profiles.headline')}</Label>
                                    <Input id="headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">{t('profiles.location')}</Label>
                                    <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">{t('profiles.bio')}</Label>
                                    <Input id="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={form.is_public} onChange={(e) => setForm({ ...form, is_public: e.target.checked })} />
                                    {t('profiles.public')}
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

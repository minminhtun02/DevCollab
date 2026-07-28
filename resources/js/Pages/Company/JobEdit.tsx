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
import { companyNavItems } from './nav';

interface JobDetail {
    id: number;
    title: string;
    description: string | null;
    location: string | null;
    employment_type: string | null;
}

export default function JobEdit() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);
    const id = useResourceId();
    const [form, setForm] = useState({ title: '', description: '', location: '', employment_type: 'full_time' });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['company', 'jobs', id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<JobDetail>>(`/v1/company/jobs/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    useEffect(() => {
        if (data) {
            setForm({
                title: data.title,
                description: data.description ?? '',
                location: data.location ?? '',
                employment_type: data.employment_type ?? 'full_time',
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: () => api.put(`/v1/company/jobs/${id}`, form),
        onSuccess: () => {
            toast.success('Job updated');
            router.visit(`/company/jobs/${id}`);
        },
    });

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader title="Edit job" />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    <div className="mx-auto max-w-xl space-y-6">
                        <AdminDetailActions backHref={`/company/jobs/${id}`} />
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
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

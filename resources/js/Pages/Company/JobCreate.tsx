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
import { companyNavItems } from './nav';

export default function JobCreate() {
    const { t } = useTranslation();
    const navItems = companyNavItems(t);
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        employment_type: 'full_time',
        is_remote: false,
    });

    const saveMutation = useMutation({
        mutationFn: () => api.post('/v1/company/jobs', form),
        onSuccess: () => {
            toast.success('Job created');
            router.visit('/company/jobs');
        },
        onError: () => toast.error('Failed to create job'),
    });

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <ConnectShell badge="Company" portal="company" navItems={navItems}>
                <PageHeader title="Post a job" />
                <div className="mx-auto max-w-xl space-y-6">
                    <AdminDetailActions backHref="/company/jobs" />
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
                                {saveMutation.isPending ? t('common.saving') : 'Create job'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </ConnectShell>
        </AuthGuard>
    );
}

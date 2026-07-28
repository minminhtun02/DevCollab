import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AppShell } from '@/components/layouts/AppShell';
import { ListStateView, PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/lib/i18n';
import type { ApiEnvelope } from '@/types/api';
import { companyNavItems } from './nav';

interface CompanyProfile {
    id: number;
    company_name: string;
    description: string | null;
    website: string | null;
    industry: string | null;
    company_size: string | null;
    location: string | null;
}

export default function Profile() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const navItems = companyNavItems(t);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['company', 'profile'],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<CompanyProfile>>('/v1/company/profile', { signal });
            return response.data.data;
        },
    });

    const [form, setForm] = useState({
        company_name: '',
        description: '',
        website: '',
        industry: '',
        company_size: '',
        location: '',
    });

    useEffect(() => {
        if (data) {
            setForm({
                company_name: data.company_name ?? '',
                description: data.description ?? '',
                website: data.website ?? '',
                industry: data.industry ?? '',
                company_size: data.company_size ?? '',
                location: data.location ?? '',
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const response = await api.put<ApiEnvelope<CompanyProfile>>('/v1/company/profile', {
                company_name: form.company_name,
                description: form.description || null,
                website: form.website || null,
                industry: form.industry || null,
                company_size: form.company_size || null,
                location: form.location || null,
            });
            return response.data;
        },
        onSuccess: (result) => {
            toast.success(result.message);
            queryClient.invalidateQueries({ queryKey: ['company', 'profile'] });
        },
        onError: () => toast.error(t.common.error),
    });

    return (
        <AuthGuard portal="company" loginPath="/company/login">
            <AppShell portal="company" navItems={navItems} title={t.nav.profile}>
                <PageHeader title={t.nav.profile} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={false}>
                    <Card>
                        <CardContent className="pt-6">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    saveMutation.mutate();
                                }}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="company_name">Company name</Label>
                                    <Input
                                        id="company_name"
                                        value={form.company_name}
                                        onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={form.website}
                                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input
                                        id="industry"
                                        value={form.industry}
                                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company_size">Company size</Label>
                                    <Input
                                        id="company_size"
                                        value={form.company_size}
                                        onChange={(e) => setForm({ ...form, company_size: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Button type="submit" disabled={saveMutation.isPending}>
                                        {t.common.save}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </ListStateView>
            </AppShell>
        </AuthGuard>
    );
}

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { PageHeader, ListStateView } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import type { ApiEnvelope } from '@/types/api';
import { webNavItems } from './nav';

interface DeveloperProfile {
    id: number;
    headline: string | null;
    bio: string | null;
    location: string | null;
    experience_years: number | null;
    availability: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    portfolio_url: string | null;
}

export default function Profile() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const navItems = webNavItems(t);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['web', 'profile', 'me'],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<DeveloperProfile>>('/v1/web/profile/me', { signal });
            return response.data.data;
        },
    });

    const [form, setForm] = useState({
        headline: '',
        bio: '',
        location: '',
        experience_years: '',
        availability: '',
        github_url: '',
        linkedin_url: '',
        portfolio_url: '',
    });

    useEffect(() => {
        if (data) {
            setForm({
                headline: data.headline ?? '',
                bio: data.bio ?? '',
                location: data.location ?? '',
                experience_years: data.experience_years?.toString() ?? '',
                availability: data.availability ?? '',
                github_url: data.github_url ?? '',
                linkedin_url: data.linkedin_url ?? '',
                portfolio_url: data.portfolio_url ?? '',
            });
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const response = await api.put<ApiEnvelope<DeveloperProfile>>('/v1/web/profile/me', {
                headline: form.headline || null,
                bio: form.bio || null,
                location: form.location || null,
                experience_years: form.experience_years ? Number(form.experience_years) : null,
                availability: form.availability || null,
                github_url: form.github_url || null,
                linkedin_url: form.linkedin_url || null,
                portfolio_url: form.portfolio_url || null,
            });
            return response.data;
        },
        onSuccess: (result) => {
            toast.success(result.message);
            queryClient.invalidateQueries({ queryKey: ['web', 'profile', 'me'] });
        },
        onError: () => toast.error(t('common.error')),
    });

    return (
        <AuthGuard portal="web" loginPath="/login">
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader title={t('webMenu.profile')} />
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
                                    <Label htmlFor="headline">Headline</Label>
                                    <Input
                                        id="headline"
                                        value={form.headline}
                                        onChange={(e) => setForm({ ...form, headline: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        value={form.bio}
                                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
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
                                <div className="space-y-2">
                                    <Label htmlFor="experience_years">Experience (years)</Label>
                                    <Input
                                        id="experience_years"
                                        type="number"
                                        value={form.experience_years}
                                        onChange={(e) => setForm({ ...form, experience_years: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="availability">Availability</Label>
                                    <Input
                                        id="availability"
                                        value={form.availability}
                                        onChange={(e) => setForm({ ...form, availability: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="github_url">GitHub</Label>
                                    <Input
                                        id="github_url"
                                        value={form.github_url}
                                        onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn</Label>
                                    <Input
                                        id="linkedin_url"
                                        value={form.linkedin_url}
                                        onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="portfolio_url">Portfolio</Label>
                                    <Input
                                        id="portfolio_url"
                                        value={form.portfolio_url}
                                        onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Button type="submit" disabled={saveMutation.isPending}>
                                        {t('common.save')}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </ListStateView>
            </ConnectShell>
        </AuthGuard>
    );
}

import { useQuery } from '@tanstack/react-query';
import {
    Briefcase,
    Building2,
    ClipboardList,
    Flag,
    Send,
    UserCircle2,
    Users,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api';
import { adminNavItems } from './nav';

interface AdminStats {
    users: number;
    developers: number;
    companies: number;
    jobs: number;
    job_applications: number;
    connections: number;
    events: number;
    pending_reports: number;
}

export default function Dashboard() {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin', 'dashboard', 'stats'],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<AdminStats>>('/v1/admin/dashboard/stats', { signal });
            return response.data.data;
        },
    });

    const shortcuts = [
        { title: t('dashboard.shortcutsUsers'), href: '/admin/users', icon: Users },
        { title: t('dashboard.shortcutsJobs'), href: '/admin/jobs', icon: Briefcase },
        { title: t('dashboard.shortcutsApplications'), href: '/admin/job-applications', icon: ClipboardList },
        { title: t('dashboard.shortcutsReports'), href: '/admin/reports', icon: Flag },
        { title: t('dashboard.shortcutsCompanies'), href: '/admin/companies', icon: Building2 },
        { title: t('dashboard.shortcutsProfiles'), href: '/admin/developer-profiles', icon: UserCircle2 },
    ];

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('dashboard.title')}</h1>
                    </div>

                    {isError && <p className="text-sm text-destructive">{t('dashboard.loadError')}</p>}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard title={t('dashboard.totalUsers')} value={data?.users} loading={isLoading} />
                        <StatCard title={t('menu.profiles')} value={data?.developers} loading={isLoading} />
                        <StatCard title={t('dashboard.shortcutsCompanies')} value={data?.companies} loading={isLoading} />
                        <StatCard title={t('dashboard.totalJobs')} value={data?.jobs} loading={isLoading} />
                        <StatCard title={t('dashboard.totalApplications')} value={data?.job_applications} loading={isLoading} />
                        <StatCard title={t('dashboard.connections')} value={data?.connections} loading={isLoading} />
                        <StatCard title={t('dashboard.events')} value={data?.events} loading={isLoading} />
                        <StatCard title={t('menu.reports')} value={data?.pending_reports} loading={isLoading} />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">{t('dashboard.shortcuts')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {shortcuts.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                                    >
                                        <item.icon className="mt-0.5 h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium">{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ConnectShell>
        </AuthGuard>
    );
}

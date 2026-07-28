import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useTranslation } from '@/lib/i18n';
import { webNavItems } from './nav';

export default function Settings() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <AppShell portal="web" navItems={navItems} title={t.nav.settings}>
                <PageHeader title={t.nav.settings} description="Manage your account preferences." />
                <Card>
                    <CardHeader>
                        <CardTitle>Telegram</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600">
                            Telegram notification settings will be available here. Connect your account to receive
                            alerts for messages, job updates, and events.
                        </p>
                    </CardContent>
                </Card>
            </AppShell>
        </AuthGuard>
    );
}

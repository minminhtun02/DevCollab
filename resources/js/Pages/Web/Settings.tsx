import { ConnectShell } from '@/components/layouts/ConnectShell';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { webNavItems } from './nav';

export default function Settings() {
    const { t } = useTranslation();
    const navItems = webNavItems(t);

    return (
        <AuthGuard portal="web" loginPath="/login">
            <ConnectShell badge="Developer" portal="web" navItems={navItems}>
                <PageHeader description="Manage your account preferences." />
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
            </ConnectShell>
        </AuthGuard>
    );
}

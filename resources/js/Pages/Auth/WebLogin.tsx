import { AuthForm } from '@/features/auth/components/AuthForm';
import { useTranslation } from '@/lib/i18n';

export default function WebLogin() {
    const { t } = useTranslation();

    return (
        <AuthForm
            portal="web"
            apiPrefix="web"
            mode="login"
            redirectTo="/app/dashboard"
            title={`${t.app.name} — ${t.auth.login}`}
        />
    );
}

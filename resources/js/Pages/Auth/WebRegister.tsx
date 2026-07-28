import { AuthForm } from '@/features/auth/components/AuthForm';
import { useTranslation } from '@/lib/i18n';

export default function WebRegister() {
    const { t } = useTranslation();

    return (
        <AuthForm
            portal="web"
            apiPrefix="web"
            mode="register"
            redirectTo="/app/dashboard"
            title={`${t.app.name} — ${t.auth.register}`}
        />
    );
}

import { AuthForm } from '@/features/auth/components/AuthForm';
import { useTranslation } from '@/lib/i18n';

export default function AdminLogin() {
    const { t } = useTranslation();

    return (
        <AuthForm
            portal="admin"
            apiPrefix="admin"
            mode="login"
            redirectTo="/admin/dashboard"
            title={`${t.app.name} Admin — ${t.auth.login}`}
        />
    );
}

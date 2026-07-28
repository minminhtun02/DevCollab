import { AuthForm } from '@/features/auth/components/AuthForm';
import { useTranslation } from '@/lib/i18n';

export default function CompanyLogin() {
    const { t } = useTranslation();

    return (
        <AuthForm
            portal="company"
            apiPrefix="company"
            mode="login"
            redirectTo="/company/dashboard"
            title={`${t.app.name} Company — ${t.auth.login}`}
        />
    );
}

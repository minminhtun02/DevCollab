import { AuthForm } from '@/features/auth/components/AuthForm';

export default function CompanyLogin() {
    return (
        <AuthForm
            portal="company"
            apiPrefix="company"
            mode="login"
            redirectTo="/company/dashboard"
        />
    );
}

import { AuthForm } from '@/features/auth/components/AuthForm';

export default function WebLogin() {
    return (
        <AuthForm
            portal="web"
            apiPrefix="web"
            mode="login"
            redirectTo="/app/dashboard"
        />
    );
}

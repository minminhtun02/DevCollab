import { AuthForm } from '@/features/auth/components/AuthForm';

export default function WebRegister() {
    return (
        <AuthForm
            portal="web"
            apiPrefix="web"
            mode="register"
            redirectTo="/app/dashboard"
        />
    );
}

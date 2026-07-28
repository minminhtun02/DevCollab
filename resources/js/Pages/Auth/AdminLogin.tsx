import { Link } from '@inertiajs/react';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { useTranslation } from '@/hooks/useTranslation';

export default function AdminLogin() {
    const { t } = useTranslation();

    return (
        <AuthForm
            portal="admin"
            mode="login"
            apiPrefix="admin"
            redirectTo="/admin/dashboard"
           
        />
    );
}

export function AdminLoginFooter() {
    return (
        <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary underline">
                Developer portal
            </Link>
        </p>
    );
}

import { type ReactNode, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useAuthStore, type AuthPortal } from '@/store/auth-store';

export function useRequireAuth(portal: AuthPortal, loginPath: string) {
    const { portal: currentPortal, token } = useAuthStore();

    useEffect(() => {
        if (!token || currentPortal !== portal) {
            router.visit(loginPath);
        }
    }, [token, currentPortal, portal, loginPath]);
}

export function AuthGuard({
    portal,
    loginPath,
    children,
}: {
    portal: AuthPortal;
    loginPath: string;
    children: ReactNode;
}) {
    useRequireAuth(portal, loginPath);
    const { token, portal: currentPortal } = useAuthStore();

    if (!token || currentPortal !== portal) {
        return null;
    }

    return <>{children}</>;
}

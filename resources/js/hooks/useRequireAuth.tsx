import { type ReactNode, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { LoadingState } from '@/components/common/LoadingState';
import { useAuthHydrated } from '@/hooks/useAuthHydrated';
import { useAuthStore, type AuthPortal } from '@/store/auth-store';

export function useRequireAuth(portal: AuthPortal, loginPath: string) {
    const hydrated = useAuthHydrated();
    const { portal: currentPortal, token } = useAuthStore();

    useEffect(() => {
        if (!hydrated) {
            return;
        }
        if (!token || currentPortal !== portal) {
            router.visit(loginPath);
        }
    }, [hydrated, token, currentPortal, portal, loginPath]);
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
    const hydrated = useAuthHydrated();
    useRequireAuth(portal, loginPath);
    const { token, portal: currentPortal } = useAuthStore();

    if (!hydrated) {
        return <LoadingState />;
    }

    if (!token || currentPortal !== portal) {
        return null;
    }

    return <>{children}</>;
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthPortal = 'web' | 'admin' | 'company';

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface AuthState {
    portal: AuthPortal | null;
    token: string | null;
    user: AuthUser | null;
    setAuth: (portal: AuthPortal, token: string, user: AuthUser) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            portal: null,
            token: null,
            user: null,
            setAuth: (portal, token, user) => set({ portal, token, user }),
            clearAuth: () => set({ portal: null, token: null, user: null }),
        }),
        { name: 'devcollab-auth' },
    ),
);

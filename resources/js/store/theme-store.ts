import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'devcollab-theme';

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
    if (typeof window === 'undefined') {
        return 'light';
    }
    if (mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
}

export function applyThemeMode(mode: ThemeMode) {
    if (typeof document === 'undefined') {
        return;
    }
    document.documentElement.classList.toggle('dark', resolveTheme(mode) === 'dark');
}

interface ThemeState {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleLightDark: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: 'system',
            setMode: (mode) => {
                applyThemeMode(mode);
                set({ mode });
            },
            toggleLightDark: () => {
                const resolved = resolveTheme(get().mode);
                const next = resolved === 'dark' ? 'light' : 'dark';
                applyThemeMode(next);
                set({ mode: next });
            },
        }),
        {
            name: STORAGE_KEY,
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyThemeMode(state.mode);
                }
            },
        },
    ),
);

export function getStoredThemeMode(): ThemeMode {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return 'system';
        }
        const parsed = JSON.parse(raw) as { state?: { mode?: ThemeMode } };
        return parsed.state?.mode ?? 'system';
    } catch {
        return 'system';
    }
}

import { type ReactNode, useEffect } from 'react';
import { applyThemeMode, useThemeStore } from '@/store/theme-store';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const mode = useThemeStore((s) => s.mode);

    useEffect(() => {
        applyThemeMode(mode);

        if (mode !== 'system') {
            return;
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => applyThemeMode('system');
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [mode]);

    return children;
}

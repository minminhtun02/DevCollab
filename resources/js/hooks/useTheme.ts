import { useEffect, useState } from 'react';
import { useThemeStore, type ThemeMode } from '@/store/theme-store';

export function useTheme() {
    const mode = useThemeStore((s) => s.mode);
    const setMode = useThemeStore((s) => s.setMode);
    const toggleLightDark = useThemeStore((s) => s.toggleLightDark);
    const [resolved, setResolved] = useState<'light' | 'dark'>(() =>
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );

    useEffect(() => {
        const update = () => {
            setResolved(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        };
        update();
        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [mode]);

    return {
        theme: mode,
        resolvedTheme: resolved,
        setTheme: setMode,
        toggleLightDark,
    };
}

export type { ThemeMode };

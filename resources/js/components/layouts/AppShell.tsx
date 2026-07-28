import { Link, router } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';

export interface NavItem {
    label: string;
    href: string;
}

interface AppShellProps {
    title?: string;
    portal: 'web' | 'admin' | 'company';
    navItems: NavItem[];
    children: ReactNode;
}

const portalColors = {
    web: 'bg-indigo-600',
    admin: 'bg-slate-900',
    company: 'bg-emerald-700',
};

export function AppShell({ title, portal, navItems, children }: AppShellProps) {
    const { t } = useTranslation();
    const { user, clearAuth } = useAuthStore();

    const logout = () => {
        clearAuth();
        router.visit(`/${portal === 'web' ? '' : portal}/login`);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className={cn('text-white', portalColors[portal])}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <div>
                        <Link href="/" className="text-lg font-bold">
                            {t.app.name}
                        </Link>
                        {title && <p className="text-sm opacity-80">{title}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm">{user?.name}</span>
                        <Button variant="secondary" size="sm" onClick={logout}>
                            {t.common.logout}
                        </Button>
                    </div>
                </div>
            </header>
            <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
                <aside className="hidden w-56 shrink-0 md:block">
                    <nav className="space-y-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <main className="min-w-0 flex-1">{children}</main>
            </div>
        </div>
    );
}

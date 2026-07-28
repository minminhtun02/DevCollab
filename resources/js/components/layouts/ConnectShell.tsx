import { Link, router, usePage } from '@inertiajs/react';
import { Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { BrandWordmark, ShellHeaderBrand } from '@/components/brand/BrandMark';
import { SidebarUserPanel } from '@/components/layouts/SidebarUserPanel';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';

export interface NavItem {
    label: string;
    href: string;
    icon?: ReactNode;
}

interface ConnectShellProps {
    badge: string;
    portal: 'web' | 'admin' | 'company';
    navItems: NavItem[];
    children: ReactNode;
}

export function ConnectShell({ badge, portal, navItems, children }: ConnectShellProps) {
    const { user, clearAuth } = useAuthStore();
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const logout = () => {
        clearAuth();
        router.visit(portal === 'web' ? '/login' : `/${portal}/login`);
    };

    const isActive = (href: string) => url === href || url.startsWith(`${href}/`);

    const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => (
        <nav className="space-y-1 p-2">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                        'dc-nav-link',
                        isActive(item.href) ? 'dc-nav-link-active' : 'dc-nav-link-idle',
                        collapsed && 'justify-center px-2',
                    )}
                    title={collapsed ? item.label : undefined}
                >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                </Link>
            ))}
        </nav>
    );

    return (
        <div className="flex min-h-screen bg-background">
            <aside
                className={cn(
                    'connect-sidebar fixed inset-y-0 left-0 z-40 hidden border-r transition-all md:flex md:flex-col',
                    collapsed ? 'w-[72px]' : 'w-64',
                )}
            >
                <div className="flex h-14 items-center border-b border-sidebar-border px-4">
                    {!collapsed ? <BrandWordmark /> : <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">DC</div>}
                </div>
                <div className="flex-1 overflow-y-auto">
                    <SidebarNav />
                </div>
                <SidebarUserPanel collapsed={collapsed} user={user} onLogout={logout} />
            </aside>

            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <button type="button" className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
                    <aside className="connect-sidebar absolute left-0 top-0 flex h-full w-72 flex-col border-r">
                        <div className="flex items-center justify-between border-b p-4">
                            <BrandWordmark />
                            <button type="button" onClick={() => setMobileOpen(false)}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <SidebarNav onNavigate={() => setMobileOpen(false)} />
                        </div>
                        <SidebarUserPanel user={user} onLogout={logout} />
                    </aside>
                </div>
            )}

            <div className={cn('flex min-h-screen flex-1 flex-col transition-all', collapsed ? 'md:pl-[72px]' : 'md:pl-64')}>
                <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                    <button type="button" className="rounded-md p-2 hover:bg-accent md:hidden" onClick={() => setMobileOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        className="hidden rounded-md p-2 hover:bg-accent md:inline-flex"
                        onClick={() => setCollapsed((v) => !v)}
                    >
                        {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                    </button>
                    <ShellHeaderBrand badge={badge} />
                </header>
                <main className="dc-page-enter flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}

/** @deprecated use ConnectShell */
export const AppShell = ConnectShell;

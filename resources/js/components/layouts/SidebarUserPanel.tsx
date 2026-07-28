import { ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PreferencesPanel } from '@/components/common/PreferencesPanel';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface SidebarUserPanelProps {
    collapsed?: boolean;
    user?: { name: string; email: string } | null;
    onLogout: () => void;
}

export function SidebarUserPanel({ collapsed = false, user, onLogout }: SidebarUserPanelProps) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const initials = user?.name?.trim().charAt(0).toUpperCase() || '?';

    useEffect(() => {
        if (!open) {
            return;
        }

        const onPointerDown = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    const handleLogout = () => {
        setOpen(false);
        onLogout();
    };

    if (collapsed) {
        return (
            <div ref={rootRef} className="relative border-t border-sidebar-border p-2">
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    className={cn(
                        'mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-sm font-semibold text-primary transition-colors',
                        open && 'ring-2 ring-primary/30',
                    )}
                    title={user?.name ?? t('common.settings')}
                    aria-expanded={open}
                >
                    {initials}
                </button>

                {open && (
                    <div className="absolute bottom-0 left-full z-50 ml-2 w-64 overflow-hidden rounded-xl border border-sidebar-border bg-card text-card-foreground shadow-lg">
                        {user && (
                            <div className="border-b border-border px-3 py-2.5">
                                <p className="truncate text-sm font-semibold">{user.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        )}
                        <PreferencesPanel onLogout={handleLogout} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={rootRef} className="relative border-t border-sidebar-border p-3">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className={cn(
                    'flex w-full items-center gap-3 rounded-xl border border-sidebar-border/80 bg-background/60 px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent/60',
                    open && 'border-primary/30 bg-sidebar-accent/40 ring-1 ring-primary/20',
                )}
                aria-expanded={open}
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-sm font-semibold text-primary">
                    {initials}
                </div>
                {user && (
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-sidebar-foreground">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                )}
                <ChevronsUpDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
            </button>

            {open && (
                <div className="absolute bottom-full left-3 right-3 z-50 mb-2 overflow-hidden rounded-xl border border-sidebar-border bg-card text-card-foreground shadow-lg">
                    <PreferencesPanel onLogout={handleLogout} />
                </div>
            )}
        </div>
    );
}

import { cn } from '@/lib/utils';

export function BrandWordmark({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                DC
            </div>
            <div className="leading-tight">
                <span className="block text-base font-bold tracking-tight text-foreground">DevCollab</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-amber)]">
                    Connect
                </span>
            </div>
        </div>
    );
}

export function ShellHeaderBrand({ badge }: { badge: string }) {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <BrandWordmark />
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {badge}
            </span>
        </div>
    );
}

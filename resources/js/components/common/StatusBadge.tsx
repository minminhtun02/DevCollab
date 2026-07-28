import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const toneMap: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    open: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    accepted: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    resolved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    pending: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
    draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    banned: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    closed: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export function StatusBadge({ status }: { status?: string | null }) {
    const { t } = useTranslation();
    if (!status) {
        return <span>—</span>;
    }

    const label = t(`status.${status}`, { defaultValue: status.replace(/_/g, ' ') });

    return (
        <span
            className={cn(
                'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                toneMap[status] ?? 'bg-muted text-muted-foreground',
            )}
        >
            {label}
        </span>
    );
}

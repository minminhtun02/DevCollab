import { Inbox } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function EmptyState({ message }: { message?: string }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
            <Inbox className="h-8 w-8" />
            <p>{message ?? t.common.empty}</p>
        </div>
    );
}

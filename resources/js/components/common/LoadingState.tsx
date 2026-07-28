import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function LoadingState({ message }: { message?: string }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <p>{message ?? t.common.loading}</p>
        </div>
    );
}

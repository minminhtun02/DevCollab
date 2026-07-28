import { AlertCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function ErrorState({ message }: { message?: string }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <p>{message ?? t.common.error}</p>
        </div>
    );
}

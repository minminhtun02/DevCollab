import { ArrowLeft } from 'lucide-react';
import { type ReactNode } from 'react';
import { ButtonLink } from '@/components/common/ButtonLink';
import { useTranslation } from '@/hooks/useTranslation';

export function AdminDetailActions({
    backHref,
    children,
}: {
    backHref: string;
    children?: ReactNode;
}) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center gap-2">
            <ButtonLink href={backHref} variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                {t('common.back')}
            </ButtonLink>
            {children}
        </div>
    );
}

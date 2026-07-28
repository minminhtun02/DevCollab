import { Globe } from 'lucide-react';
import { SegmentedControl } from '@/components/common/SegmentedControl';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className, compact = false }: { className?: string; compact?: boolean }) {
    const { i18n, t } = useTranslation();

    const currentLang = (i18n.language?.startsWith('my') ? 'my' : 'en') as 'en' | 'my';
    const options = [
        { value: 'en' as const, label: t('common.languages.en') },
        { value: 'my' as const, label: t('common.languages.my') },
    ];

    if (compact) {
        return (
            <SegmentedControl
                className={className}
                value={currentLang}
                onChange={(code) => void i18n.changeLanguage(code)}
                options={options}
                aria-label={t('common.language')}
            />
        );
    }

    return (
        <div className={cn('space-y-1.5', className)}>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                <span>{t('common.language')}</span>
            </div>
            <SegmentedControl
                value={currentLang}
                onChange={(code) => void i18n.changeLanguage(code)}
                options={options}
                aria-label={t('common.language')}
            />
        </div>
    );
}

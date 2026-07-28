import { Monitor, Moon, Sun } from 'lucide-react';
import { SegmentedControl } from '@/components/common/SegmentedControl';
import { useTheme, type ThemeMode } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const themeOptions: { value: ThemeMode; labelKey: string; icon: typeof Sun }[] = [
    { value: 'light', labelKey: 'light', icon: Sun },
    { value: 'dark', labelKey: 'dark', icon: Moon },
    { value: 'system', labelKey: 'system', icon: Monitor },
];

export function ThemeSwitcher({ className }: { className?: string }) {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();

    return (
        <div className={cn('space-y-1.5', className)}>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Sun className="h-3.5 w-3.5" />
                <span>{t('common.theme')}</span>
            </div>
            <SegmentedControl
                value={theme}
                onChange={setTheme}
                options={themeOptions.map((item) => {
                    const Icon = item.icon;
                    return {
                        value: item.value,
                        label: t(`common.themeOptions.${item.labelKey}`),
                        icon: <Icon className="h-3.5 w-3.5" />,
                    };
                })}
                aria-label={t('common.theme')}
            />
        </div>
    );
}

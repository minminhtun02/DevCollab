import { Globe, LogOut, Monitor, Moon, Sun } from 'lucide-react';
import { SegmentedControl } from '@/components/common/SegmentedControl';
import { Button } from '@/components/ui/button';
import { useTheme, type ThemeMode } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const themeOptions: { value: ThemeMode; labelKey: string; icon: typeof Sun }[] = [
    { value: 'light', labelKey: 'light', icon: Sun },
    { value: 'dark', labelKey: 'dark', icon: Moon },
    { value: 'system', labelKey: 'system', icon: Monitor },
];

interface PreferencesPanelProps {
    className?: string;
    onLogout?: () => void;
}

export function PreferencesPanel({ className, onLogout }: PreferencesPanelProps) {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();

    const languageOptions = [
        { value: 'en' as const, label: t('common.languages.en') },
        { value: 'my' as const, label: t('common.languages.my') },
    ];

    const currentLang = (i18n.language?.startsWith('my') ? 'my' : 'en') as 'en' | 'my';

    return (
        <div className={cn('space-y-3 p-3', className)}>
            <div className="space-y-2">
                <div className="flex items-center gap-2 px-0.5 text-xs font-medium text-muted-foreground">
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span>{t('common.language')}</span>
                </div>
                <SegmentedControl
                    value={currentLang}
                    onChange={(code) => void i18n.changeLanguage(code)}
                    options={languageOptions}
                    aria-label={t('common.language')}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 px-0.5 text-xs font-medium text-muted-foreground">
                    <Sun className="h-3.5 w-3.5 shrink-0" />
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

            {onLogout && (
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-full gap-2 shadow-none"
                    onClick={onLogout}
                >
                    <LogOut className="h-4 w-4" />
                    {t('auth.logout')}
                </Button>
            )}
        </div>
    );
}

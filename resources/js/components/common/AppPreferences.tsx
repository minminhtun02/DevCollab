import { Settings2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PreferencesPanel } from '@/components/common/PreferencesPanel';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function AppPreferences({ className }: { className?: string }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={rootRef} className={cn('relative', className)}>
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
            >
                <Settings2 className="h-4 w-4" />
                {t('common.settings')}
            </Button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg">
                    <PreferencesPanel />
                </div>
            )}
        </div>
    );
}

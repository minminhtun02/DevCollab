import { Link } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface RowActionsProps {
    viewHref?: string;
    editHref?: string;
    onDelete?: () => void;
}

export function RowActions({ viewHref, editHref, onDelete }: RowActionsProps) {
    const { t } = useTranslation();
    const iconClass = cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
    );

    return (
        <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
            {viewHref && (
                <Link href={viewHref} className={iconClass} title={t('common.actions.view')}>
                    <Eye className="h-4 w-4" />
                </Link>
            )}
            {editHref && (
                <Link href={editHref} className={iconClass} title={t('common.actions.edit')}>
                    <Pencil className="h-4 w-4" />
                </Link>
            )}
            {onDelete && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    title={t('common.actions.delete')}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

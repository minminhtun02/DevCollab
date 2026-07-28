import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    destructive = false,
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <button type="button" className="absolute inset-0 bg-foreground/40" onClick={onCancel} aria-label="Close" />
            <div className="relative z-10 w-full max-w-md rounded-xl border bg-card p-6 shadow-lg">
                <h2 className="text-lg font-semibold">{title}</h2>
                {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
                <div className="mt-6 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button type="button" variant={destructive ? 'destructive' : 'default'} onClick={onConfirm} disabled={loading}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';

export interface SegmentedOption<T extends string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
    title?: string;
}

interface SegmentedControlProps<T extends string> {
    value: T;
    options: SegmentedOption<T>[];
    onChange: (value: T) => void;
    className?: string;
    size?: 'sm' | 'md';
    'aria-label'?: string;
}

export function SegmentedControl<T extends string>({
    value,
    options,
    onChange,
    className,
    size = 'sm',
    'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
    return (
        <div
            role="group"
            aria-label={ariaLabel}
            className={cn(
                'inline-flex w-full rounded-lg border border-sidebar-border bg-background/80 p-0.5',
                className,
            )}
        >
            {options.map((option) => {
                const active = option.value === value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        title={option.title ?? option.label}
                        aria-pressed={active}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            'flex flex-1 items-center justify-center gap-1.5 rounded-md font-medium transition-colors',
                            size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
                            active
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground',
                        )}
                    >
                        {option.icon}
                        <span className="truncate">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { type ReactNode } from 'react';
import { RowActions } from '@/components/common/RowActions';
import { ButtonLink } from '@/components/common/ButtonLink';
import type { TFunction } from 'i18next';

interface RowWithId {
    id: number;
}

export function resourceActionsColumn<T extends RowWithId>(
    t: TFunction,
    basePath: string,
    options?: {
        showView?: boolean;
        showEdit?: boolean;
        onDelete?: (row: T) => void;
    },
): { key: string; header: string; render: (row: T) => ReactNode } {
    const showView = options?.showView ?? true;
    const showEdit = options?.showEdit ?? true;

    return {
        key: 'actions',
        header: t('common.table.actions'),
        render: (row) => (
            <RowActions
                viewHref={showView ? `${basePath}/${row.id}` : undefined}
                editHref={showEdit ? `${basePath}/${row.id}/edit` : undefined}
                onDelete={options?.onDelete ? () => options.onDelete?.(row) : undefined}
            />
        ),
    };
}

export function linkedNameColumn<T extends RowWithId & { name?: string | null; title?: string | null }>(
    header: string,
    basePath: string,
    getLabel: (row: T) => string = (row) => row.name ?? row.title ?? `#${row.id}`,
) {
    return {
        key: 'name',
        header,
        render: (row: T) => (
            <Link href={`${basePath}/${row.id}`} className="font-medium text-primary hover:underline">
                {getLabel(row)}
            </Link>
        ),
    };
}

export function createHeaderAction(href: string, label: string) {
    return (
        <ButtonLink href={href} size="sm">
            <Plus className="h-4 w-4" />
            {label}
        </ButtonLink>
    );
}

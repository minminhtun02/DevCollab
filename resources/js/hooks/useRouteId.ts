import { usePage } from '@inertiajs/react';

export function useRouteId(from: 'last' | 'parent' = 'last'): string {
    const { url } = usePage();
    const parts = url.split('?')[0].split('/').filter(Boolean);
    if (from === 'parent') {
        return parts[parts.length - 2] ?? '';
    }
    return parts[parts.length - 1] ?? '';
}

export function useResourceId(propId?: string | number | null): string {
    const { props } = usePage<{ id?: string | number }>();
    const urlId = useRouteId();
    const parentId = useRouteId('parent');
    const fromProp = propId ?? props.id;

    if (fromProp != null && String(fromProp) !== '') {
        return String(fromProp);
    }

    if (urlId && urlId !== 'edit' && urlId !== 'create') {
        return urlId;
    }

    return parentId;
}

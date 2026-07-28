export function formatDate(value?: string | null, withTime = false): string {
    if (!value) {
        return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '—';
    }
    return withTime ? date.toLocaleString() : date.toLocaleDateString();
}

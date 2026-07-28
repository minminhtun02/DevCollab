import { type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminDetailActions } from '@/components/admin/AdminDetailActions';
import { ConnectShell } from '@/components/layouts/ConnectShell';
import { DetailCard, DetailField, ListStateView, PageHeader, StatusBadge } from '@/components/common';
import { ButtonLink } from '@/components/common/ButtonLink';
import { AuthGuard } from '@/hooks/useRequireAuth';
import { useResourceId } from '@/hooks/useRouteId';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import { formatDate } from '@/lib/format-date';
import type { ApiEnvelope } from '@/types/api';
import { adminNavItems } from '@/Pages/Admin/nav';

export interface DetailFieldConfig {
    label: string;
    key?: string;
    render?: (data: Record<string, unknown>) => ReactNode;
}

interface AdminResourceShowProps {
    title: string;
    backHref: string;
    apiPath: string;
    queryKey: string[];
    fields: DetailFieldConfig[];
    actions?: ReactNode;
    editHref?: string;
    editable?: boolean;
}

function AdminResourceShowInner({
    title,
    backHref,
    apiPath,
    queryKey,
    fields,
    actions,
    editHref,
    editable = false,
}: AdminResourceShowProps) {
    const { t } = useTranslation();
    const navItems = adminNavItems(t);
    const id = useResourceId();
    const resolvedEditHref = editHref ?? (editable ? `${backHref}/${id}/edit` : undefined);

    const { data, isLoading, isError } = useQuery({
        queryKey: [...queryKey, id],
        queryFn: async ({ signal }) => {
            const response = await api.get<ApiEnvelope<Record<string, unknown>>>(`${apiPath}/${id}`, { signal });
            return response.data.data;
        },
        enabled: Boolean(id),
    });

    const cardTitle = data && typeof data.name === 'string' ? data.name : typeof data?.title === 'string' ? data.title : title;

    return (
        <AuthGuard portal="admin" loginPath="/admin/login">
            <ConnectShell badge="Admin" portal="admin" navItems={navItems}>
                <PageHeader title={title} />
                <ListStateView isLoading={isLoading} isError={isError} isEmpty={!data}>
                    {data && (
                        <div className="space-y-6">
                            <AdminDetailActions backHref={backHref}>
                                {resolvedEditHref ? (
                                    <ButtonLink href={resolvedEditHref} size="sm">
                                        {t('common.edit')}
                                    </ButtonLink>
                                ) : null}
                                {actions}
                            </AdminDetailActions>
                            <DetailCard title={String(cardTitle)}>
                                {fields.map((field) => {
                                    const value = field.render
                                        ? field.render(data)
                                        : field.key
                                          ? renderValue(data[field.key])
                                          : '—';
                                    return <DetailField key={field.label} label={field.label} value={value} />;
                                })}
                            </DetailCard>
                        </div>
                    )}
                </ListStateView>
            </ConnectShell>
        </AuthGuard>
    );
}

function renderValue(value: unknown): ReactNode {
    if (value == null || value === '') {
        return '—';
    }
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value)) {
        return formatDate(value, value.includes('T'));
    }
    if (typeof value === 'object') {
        if (value && 'name' in (value as object)) {
            return String((value as { name?: string }).name);
        }
        if (value && 'company_name' in (value as object)) {
            return String((value as { company_name?: string }).company_name);
        }
        if (value && 'email' in (value as object)) {
            return String((value as { email?: string }).email);
        }
        return JSON.stringify(value);
    }
    if (typeof value === 'string' && ['active', 'pending', 'banned', 'open', 'closed', 'draft'].includes(value)) {
        return <StatusBadge status={value} />;
    }
    return String(value);
}

export default AdminResourceShowInner;

export function createAdminShowPage(config: Omit<AdminResourceShowProps, never>) {
    return function AdminShowPage() {
        return <AdminResourceShowInner {...config} />;
    };
}

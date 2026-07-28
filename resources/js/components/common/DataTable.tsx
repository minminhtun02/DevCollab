import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ListStateView } from './ListStateView';
import { useTranslation } from '@/lib/i18n';
import type { PaginatedResult } from '@/types/api';

export interface DataTableParams {
    page: number;
    per_page: number;
    search: string;
    sort_by: string;
    sort_dir: 'asc' | 'desc';
}

interface Column<T> {
    key: string;
    header: string;
    render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    fetchFunction: (params: DataTableParams, signal?: AbortSignal) => Promise<PaginatedResult<T>>;
    refreshTrigger?: number;
}

export function DataTable<T>({ columns, fetchFunction, refreshTrigger = 0 }: DataTableProps<T>) {
    const { t } = useTranslation();
    const [params, setParams] = useState<DataTableParams>({
        page: 1,
        per_page: 15,
        search: '',
        sort_by: 'created_at',
        sort_dir: 'desc',
    });
    const [rows, setRows] = useState<T[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        setIsError(false);

        fetchFunction(params, controller.signal)
            .then((result) => {
                setRows(result.data);
                setTotalCount(result.totalCount);
            })
            .catch(() => {
                if (!controller.signal.aborted) setIsError(true);
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsLoading(false);
            });

        return () => controller.abort();
    }, [params, refreshTrigger, fetchFunction]);

    const lastPage = Math.max(1, Math.ceil(totalCount / params.per_page));

    return (
        <div className="space-y-4">
            <Input
                placeholder={t.common.search}
                value={params.search}
                onChange={(e) => setParams((p) => ({ ...p, search: e.target.value, page: 1 }))}
                className="max-w-sm"
            />
            <ListStateView isLoading={isLoading} isError={isError} isEmpty={!isLoading && !isError && rows.length === 0}>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {rows.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                                            {col.render(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{totalCount} records</span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={params.page <= 1}
                            className="rounded border px-3 py-1 disabled:opacity-50"
                            onClick={() => setParams((p) => ({ ...p, page: p.page - 1 }))}
                        >
                            Prev
                        </button>
                        <span>
                            {params.page} / {lastPage}
                        </span>
                        <button
                            type="button"
                            disabled={params.page >= lastPage}
                            className="rounded border px-3 py-1 disabled:opacity-50"
                            onClick={() => setParams((p) => ({ ...p, page: p.page + 1 }))}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </ListStateView>
        </div>
    );
}

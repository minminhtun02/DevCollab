import api from '@/lib/api';
import type { ApiEnvelope, PaginatedResult } from '@/types/api';
import type { DataTableParams } from '@/components/common/DataTable';

export function createApiDataSource<T>(endpoint: string) {
    return async (params: DataTableParams, signal?: AbortSignal): Promise<PaginatedResult<T>> => {
        const response = await api.get<ApiEnvelope<T[]>>(endpoint, {
            signal,
            params: {
                page: params.page,
                per_page: params.per_page,
                search: params.search || undefined,
                sort_by: params.sort_by,
                sort_dir: params.sort_dir,
            },
        });

        return {
            data: response.data.data ?? [],
            totalCount: response.data.meta?.total ?? response.data.data?.length ?? 0,
        };
    };
}

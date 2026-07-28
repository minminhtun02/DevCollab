export interface ApiEnvelope<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: PaginationMeta;
    errors?: Record<string, string[]>;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface PaginatedResult<T> {
    data: T[];
    totalCount: number;
}

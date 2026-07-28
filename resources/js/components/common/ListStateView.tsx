import { type ReactNode } from 'react';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';

interface ListStateViewProps {
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    errorMessage?: string;
    emptyMessage?: string;
    children: ReactNode;
}

export function ListStateView({
    isLoading,
    isError,
    isEmpty,
    errorMessage,
    emptyMessage,
    children,
}: ListStateViewProps) {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState message={errorMessage} />;
    if (isEmpty) return <EmptyState message={emptyMessage} />;

    return <>{children}</>;
}

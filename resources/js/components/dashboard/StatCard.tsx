import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StatCard({
    title,
    value,
    loading,
    hint,
}: {
    title: string;
    value?: number | string;
    loading: boolean;
    hint?: string;
}) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
                ) : (
                    <>
                        <p className="text-2xl font-bold">{value ?? 0}</p>
                        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
                    </>
                )}
            </CardContent>
        </Card>
    );
}

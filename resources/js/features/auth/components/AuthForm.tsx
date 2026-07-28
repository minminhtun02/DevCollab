import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { BrandWordmark } from '@/components/brand/BrandMark';
import { AppPreferences } from '@/components/common/AppPreferences';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore, type AuthPortal } from '@/store/auth-store';
import type { ApiEnvelope } from '@/types/api';
import { cn } from '@/lib/utils';

interface AuthFormProps {
    portal: AuthPortal;
    mode: 'login' | 'register';
    apiPrefix: string;
    redirectTo: string;
    title?: string;
    extraFields?: React.ReactNode;
    registerPayload?: (base: Record<string, string>) => Record<string, string>;
}

interface AuthResponse {
    user: { id: number; name: string; email: string; role: string; status: string };
    token: string;
}

export function AuthForm({
    portal,
    mode,
    apiPrefix,
    redirectTo,
    extraFields,
    registerPayload,
}: AuthFormProps) {
    const { t } = useTranslation();
    const setAuth = useAuthStore((s) => s.setAuth);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload =
                mode === 'register'
                    ? (registerPayload?.(form) ?? form)
                    : { email: form.email, password: form.password };

            const response = await api.post<ApiEnvelope<AuthResponse>>(
                `/v1/${apiPrefix}/auth/${mode === 'register' ? 'register' : 'login'}`,
                payload,
            );

            setAuth(portal, response.data.data.token, response.data.data.user);
            toast.success(response.data.message);
            router.visit(redirectTo);
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                t('auth.unexpectedError');
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-10">
            <div className="mb-6 flex w-full max-w-md items-center justify-between gap-4">
                <BrandWordmark />
                <AppPreferences />
            </div>
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="p-6 md:p-8">
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="space-y-1 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">{t('auth.welcome')}</h1>
                            <p className="text-sm text-muted-foreground">{t('auth.loginSubtitle')}</p>
                        </div>

                        {mode === 'register' && (
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('auth.name', { defaultValue: 'Name' })}</Label>
                                <Input
                                    id="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">{t('auth.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t('auth.emailPlaceholder')}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">{t('auth.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        {mode === 'register' && (
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">{t('common.confirm', { defaultValue: 'Confirm password' })}</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={form.password_confirmation}
                                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        {extraFields}

                        <Button type="submit" className={cn('w-full transition-transform active:scale-[0.98]')} disabled={loading}>
                            {loading
                                ? t('common.loading')
                                : mode === 'register'
                                  ? t('auth.register')
                                  : t('auth.login')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

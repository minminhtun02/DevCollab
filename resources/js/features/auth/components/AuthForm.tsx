import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';
import { useTranslation } from '@/lib/i18n';
import { useAuthStore, type AuthPortal } from '@/store/auth-store';
import type { ApiEnvelope } from '@/types/api';

interface AuthFormProps {
    portal: AuthPortal;
    mode: 'login' | 'register';
    apiPrefix: string;
    redirectTo: string;
    title: string;
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
    title,
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
                t.common.error;
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        {mode === 'register' && (
                            <div className="space-y-2">
                                <Label htmlFor="name">{t.auth.name}</Label>
                                <Input
                                    id="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">{t.auth.email}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t.auth.password}</Label>
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
                                <Label htmlFor="password_confirmation">{t.auth.passwordConfirmation}</Label>
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
                        <Button type="submit" className="w-full" disabled={loading}>
                            {mode === 'register' ? t.auth.register : t.auth.login}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

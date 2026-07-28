import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';

export default function Welcome() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
            <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-slate-900">{t.app.name}</h1>
                <p className="mt-4 max-w-2xl text-lg text-slate-600">{t.app.tagline}</p>
                <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Developers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-slate-500">Connect, chat, discover jobs and events.</p>
                            <Button asChild className="w-full">
                                <Link href="/login">Developer login</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/register">Register</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Companies</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-slate-500">Post jobs and manage applications.</p>
                            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800">
                                <Link href="/company/login">Company login</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/company/register">Register company</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-slate-500">Manage users, content, and moderation.</p>
                            <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                                <Link href="/admin/login">Admin login</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

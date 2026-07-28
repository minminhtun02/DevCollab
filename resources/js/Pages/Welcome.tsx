import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppPreferences } from '@/components/common/AppPreferences';
import { BrandWordmark } from '@/components/brand/BrandMark';
import { useTranslation } from '@/hooks/useTranslation';

export default function Welcome() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-8">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <BrandWordmark />
                    <AppPreferences className="sm:max-w-md" />
                </div>

                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{t('app.name')}</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">{t('app.description')}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>{t('auth.modeAdmin', { defaultValue: 'Developers' })}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">Connect, chat, discover jobs and events.</p>
                            <Button asChild className="w-full">
                                <Link href="/login">{t('auth.login')}</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/register">{t('auth.register')}</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>{t('auth.modeCompany')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">{t('auth.companyPortalHint')}</p>
                            <Button asChild variant="secondary" className="w-full">
                                <Link href="/company/login">{t('auth.companyLogin')}</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/company/register">{t('company.auth.register')}</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Admin</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">{t('auth.loginSubtitle')}</p>
                            <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                                <Link href="/admin/login">{t('auth.login')}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

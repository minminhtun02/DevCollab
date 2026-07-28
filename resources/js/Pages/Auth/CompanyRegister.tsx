import { useState } from 'react';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

export default function CompanyRegister() {
    const { t } = useTranslation();
    const [companyName, setCompanyName] = useState('');

    return (
        <AuthForm
            portal="company"
            apiPrefix="company"
            mode="register"
            redirectTo="/company/dashboard"
            extraFields={
                <div className="space-y-2">
                    <Label htmlFor="company_name">{t('companies.name')}</Label>
                    <Input
                        id="company_name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
            }
            registerPayload={(base) => ({ ...base, company_name: companyName })}
        />
    );
}

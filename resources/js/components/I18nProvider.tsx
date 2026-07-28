import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { resources } from '@/i18n/config';
import type { Locale } from '@/lib/i18n-config';

function syncLocale(locale: Locale): void {
    const bundle = resources[locale]?.translation;

    if (bundle) {
        i18n.addResourceBundle(locale, 'translation', bundle, true, true);
    }

    if (i18n.language !== locale) {
        void i18n.changeLanguage(locale);
    }
}

export function I18nProvider({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale?: Locale;
}) {
    const activeLocale = locale ?? (i18n.language as Locale) ?? 'en';

    syncLocale(activeLocale);

    useEffect(() => {
        syncLocale(activeLocale);
    }, [activeLocale]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

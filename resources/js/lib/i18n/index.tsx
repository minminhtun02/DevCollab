import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { en } from './en';
import { my } from './my';

type Locale = 'en' | 'my';

const translations = { en, my };

const I18nContext = createContext({
    locale: 'en' as Locale,
    setLocale: (_locale: Locale) => {},
    t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en');

    const value = useMemo(
        () => ({
            locale,
            setLocale,
            t: translations[locale],
        }),
        [locale],
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
    return useContext(I18nContext);
}

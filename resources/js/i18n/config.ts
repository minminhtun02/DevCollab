import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import my from './locales/my.json';
import { defaultLocale } from '@/lib/i18n-config';

export const resources = {
    en: { translation: en },
    my: { translation: my },
} as const;

if (!i18n.isInitialized) {
    i18n.use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: defaultLocale,
            supportedLngs: ['en', 'my'],
            detection: {
                order: ['localStorage', 'navigator'],
                lookupLocalStorage: 'devcollab-locale',
                caches: ['localStorage'],
            },
            interpolation: { escapeValue: false },
            react: { useSuspense: false },
        });
}

export default i18n;

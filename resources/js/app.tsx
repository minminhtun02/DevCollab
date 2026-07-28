import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/lib/i18n';

const appName = import.meta.env.VITE_APP_NAME || 'DevCollab';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            retry: 1,
        },
    },
});

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <QueryClientProvider client={queryClient}>
                <I18nProvider>
                    <App {...props} />
                    <Toaster richColors position="top-right" />
                </I18nProvider>
            </QueryClientProvider>,
        );
    },
    progress: {
        color: '#4f46e5',
    },
});

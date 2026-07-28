import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth-store';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().clearAuth();
        }

        return Promise.reject(error);
    },
);

export default api;

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(url, config);

    return response.data;
}

export async function apiPost<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.post<T>(url, data, config);

    return response.data;
}

export async function apiPut<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.put<T>(url, data, config);

    return response.data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.delete<T>(url, config);

    return response.data;
}

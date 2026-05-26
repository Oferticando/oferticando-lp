import { AxiosRequestConfig, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios';

export interface RequestApi<T> {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig | InternalAxiosRequestConfig;
    request?: unknown;
}
export type HttpRequestOptions = {
    url: string;
    params?: Record<string, string | number>;
    headers?: Record<string, string>;
    data?: unknown;
};

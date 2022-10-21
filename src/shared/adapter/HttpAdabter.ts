import { File } from "../types/Files";

export interface IHttpResponse {
    statusCode?: number | 200;
    body: any;
}

export interface IHttpRequest<B = any | undefined, P = any | undefined, Q = any | undefined> {
    body?: any | B;
    params?: any | P;
    query?: any | Q;
    user: {
        id?: string
    };
    files?: File[]
}
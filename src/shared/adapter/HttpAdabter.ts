import { File } from "../types/Files";

export interface IHttpResponse {
    statusCode?: number | 200;
    body: any;
}

export interface IHttpRequest {
    body?: any;
    params?: any;
    query?: any;
    user: {
        id?: string
    };
    files?: File[]
}
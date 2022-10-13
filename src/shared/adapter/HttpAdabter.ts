export interface IHttpResponse {
    statusCode?: number | 200;
    body: any;
}

export interface IHttpRequest {
    body?: any;
    params?: any;
    user?: any;
}
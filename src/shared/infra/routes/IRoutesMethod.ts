export enum HttpMethod {
    GET = 'get',
    PATCH = 'patch',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}

export enum SuccessResponse {
    SUCCESS_RESPONSE = 200,
}


interface IRouteConfig<C, V = undefined> {
    method: HttpMethod;
    controller: keyof C;
    validation?: keyof V;
    authentication?: boolean;
    responseCode?: SuccessResponse
    url: string;
}

export interface IRouteMethod<C, V = undefined> {
    prefix: string;
    routesConfig: IRouteConfig<C, V>[]
}
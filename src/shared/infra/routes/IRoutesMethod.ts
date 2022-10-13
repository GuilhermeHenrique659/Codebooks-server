export enum HttpMethod {
    GET = 'get',
    PATCH = 'patch',
    POST = 'post',
    DELETE = 'delete',
}



interface IRouteConfig<C, V = undefined> {
    method: HttpMethod;
    controller: keyof C;
    validation?: keyof V;
    url: string;
}

export interface IRouteMethod<C, V = undefined> {
    prefix: string;
    routesConfig: IRouteConfig<C, V>[]
}
import { IHttpRequest, IHttpResponse } from "../adapter/HttpAdabter";


export abstract class AbstractController {

    public async exeMethod(method: keyof this, params: IHttpRequest): Promise<IHttpResponse> {
        const methodToBeCall = Reflect.get(this, method);
        if (typeof methodToBeCall !== 'function')
            throw new Error('Method not implemented');
        return methodToBeCall.bind(this)(params);
    }
}
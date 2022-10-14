import { IHttpRequest, IHttpResponse } from "../adapter/HttpAdabter";
import { IAbstractServiceFactory } from "../services/IAbstractServiceFactory";


export abstract class AbstractController {
    public async exeMethod(method: keyof this, params: IHttpRequest): Promise<IHttpResponse> {
        const methodToBeCall = Reflect.get(this, method);
        if (typeof methodToBeCall !== 'function')
            throw new Error('Method not implemented');
        return methodToBeCall.bind(this)(params);
    }
}
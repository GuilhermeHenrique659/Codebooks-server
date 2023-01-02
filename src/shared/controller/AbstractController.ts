import { ControllerInput } from "../adapter/ControllerBoundary";


export abstract class AbstractController {
    public async exeMethod(method: keyof this, params: ControllerInput): Promise<object> {
        const methodToBeCall = Reflect.get(this, method);
        if (typeof methodToBeCall !== 'function')
            throw new Error('Method not implemented');
        return methodToBeCall.bind(this)(params);
    }
}
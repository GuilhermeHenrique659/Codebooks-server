import { ControllerInput, ControllerOutput } from "../adapter/ControllerBoundary";
import { IAbstractServiceFactory } from "../services/IAbstractServiceFactory";


export abstract class AbstractController {
    public async exeMethod(method: keyof this, params: ControllerInput): Promise<ControllerOutput> {
        const methodToBeCall = Reflect.get(this, method);
        if (typeof methodToBeCall !== 'function')
            throw new Error('Method not implemented');
        return methodToBeCall.bind(this)(params);
    }
}
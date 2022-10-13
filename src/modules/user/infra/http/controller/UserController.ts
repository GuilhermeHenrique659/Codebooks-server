import { IHttpRequest, IHttpResponse } from "../../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../../shared/controller/AbstractController";
import { CreateUserService } from "../../../domain/services/createUserServices/CreateUserService";

export class UserController extends AbstractController {
    constructor(private _createUserService: CreateUserService) {
        super();
    }

    public async createUserHandle(resquest: IHttpRequest): Promise<IHttpResponse> {
        const { email, name, password } = resquest.body;

        const user = await this._createUserService.execute({
            name: name,
            email: email,
            password: password
        });

        return {
            body: user
        };
    }
}


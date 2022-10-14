import { IHttpRequest, IHttpResponse } from "../../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../../shared/controller/AbstractController";
import { UserServiceFactory } from "../../../domain/services/UserServiceFactory";

export class UserController extends AbstractController {
    constructor(private usersService: UserServiceFactory) {
        super();
    }

    public async createUserHandle(request: IHttpRequest): Promise<IHttpResponse> {
        const { email, name, password } = request.body;

        const user = await this.usersService.getCreateUser().execute({
            name: name,
            email: email,
            password: password
        });

        return {
            body: user
        };
    }

    public async createUserSessionHandle(resquest: IHttpRequest): Promise<IHttpResponse> {
        const { email, password } = resquest.body;

        const token = await this.usersService.getCreateSession().execute({
            email: email,
            password: password
        })

        return {
            body: token
        }
    }
}


import { IHttpRequest, IHttpResponse } from "../../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../../shared/controller/AbstractController";
import AppError from "../../../../../shared/errors/AppError";
import { ICreateUserServiceDTO } from "../../../domain/services/createUserServices/CreateUserServiceDTO";
import { ICreateUserSessionServiceDTO } from "../../../domain/services/createUserSessionService/CreateUserSessionServiceDTO";
import { IUpdateUserServiceDTO } from "../../../domain/services/updateUserService/UpdateUserServiceDTO";
import { UserServiceFactory } from "../../../domain/services/UserServiceFactory";
export class UserController extends AbstractController {
    constructor(private usersService: UserServiceFactory) {
        super();
    }

    public async updateUserAvatarHandle(request: IHttpRequest): Promise<IHttpResponse> {
        const { files } = request;
        const { id } = request.user;

        if (!files) throw new AppError('Avatar not allowed')

        const user = await this.usersService.getUpdateUserAvatar().execute({
            user_id: id as string,
            avatar: files
        })

        return {
            body: user
        }
    }

    public async UpdateUserHandle(request: IHttpRequest<Omit<IUpdateUserServiceDTO, 'id'>>): Promise<IHttpResponse> {
        const { id } = request.user


        const user = await this.usersService.getUpdateUser().execute({id, ...request.body})
        
        return {
            body: user
        };
    }

    public async createUserHandle(request: IHttpRequest<ICreateUserServiceDTO>): Promise<IHttpResponse> {
        const user = await this.usersService.getCreateUser().execute(request.body);

        return {
            body: user
        };
    }

    public async createUserSessionHandle(resquest: IHttpRequest<ICreateUserSessionServiceDTO>): Promise<IHttpResponse> {
        const token = await this.usersService.getCreateSession().execute(resquest.body)

        return {
            body: token
        }
    }
}


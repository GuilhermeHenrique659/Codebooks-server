import { ControllerInput } from "../../../../../shared/adapter/ControllerBoundary";
import { AbstractController } from "../../../../../shared/controller/AbstractController";
import AppError from "../../../../../shared/errors/AppError";
import { ICreateUserServiceDTO } from "../../../domain/services/createUserServices/CreateUserServiceDTO";
import { ICreateUserSessionServiceDTO } from "../../../domain/services/createUserSessionService/CreateUserSessionServiceDTO";
import { IUpdateUserServiceDTO } from "../../../domain/services/updateUserService/UpdateUserServiceDTO";
import { UserServiceFactory } from "../../../domain/services/UserServiceFactory";
import { ICreateSessionResponse } from "./controllerOutput/ICreateSessionOutput";
import { UserPresentation } from "../presentation/UserPresentation";
import { IGetUserOutput } from "./controllerOutput/IGetUserOutput";
import { IShowUserService } from "../../../domain/services/showUserService/IShowUserService";
export class UserController extends AbstractController {
    constructor(private usersService: UserServiceFactory) {
        super();
    }

    public async updateUserAvatarHandle(request: ControllerInput): Promise<IGetUserOutput> {
        const { files } = request;
        const id = request.user?.id;

        if (!files) throw new AppError('Avatar not allowed')

        const user = await this.usersService.getUpdateUserAvatar().execute({
            user_id: id as string,
            avatar: files
        })

        return UserPresentation.getUserResponse(user)
    }

    public async UpdateUserHandle(request: ControllerInput<Omit<IUpdateUserServiceDTO, 'id'>>): Promise<IGetUserOutput> {
        const id = request.user?.id
        const user = await this.usersService.getUpdateUser().execute({ id: id as string, ...request.data })

        return UserPresentation.getUserResponse(user)
    }

    public async createUserHandle(request: ControllerInput<ICreateUserServiceDTO>): Promise<IGetUserOutput> {
        const user = await this.usersService.getCreateUser().execute(request.data);

        return UserPresentation.getUserResponse(user)
    }

    public async showUserHandle(request: ControllerInput<IShowUserService>): Promise<IGetUserOutput> {
        const user = await this.usersService.getShowUser().execute(request.data);

        return UserPresentation.getUserResponse(user);
    }

    public async createUserSessionHandle(resquest: ControllerInput<ICreateUserSessionServiceDTO>): Promise<ICreateSessionResponse> {
        const token = await this.usersService.getCreateSession().execute(resquest.data)

        return {
            ...token,
            userExits: UserPresentation.getUserResponse(token.userExits)
        }
    }
}


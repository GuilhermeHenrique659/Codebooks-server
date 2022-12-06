import { ControllerInput, ControllerOutput } from "../../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../../shared/controller/AbstractController";
import AppError from "../../../../../shared/errors/AppError";
import { ICreateUserServiceDTO } from "../../../domain/services/createUserServices/CreateUserServiceDTO";
import { ICreateUserSessionServiceDTO } from "../../../domain/services/createUserSessionService/CreateUserSessionServiceDTO";
import { IUpdateUserServiceDTO } from "../../../domain/services/updateUserService/UpdateUserServiceDTO";
import { UserServiceFactory } from "../../../domain/services/UserServiceFactory";
import { ICreateSessionResponse } from "./controllerOutput/ICreateSessionOutput";
import { UserPresentation } from "../presentation/UserPresentation";
import { IGetUserOutput } from "./controllerOutput/IGetUserOutput";
export class UserController extends AbstractController {
    constructor(private usersService: UserServiceFactory) {
        super();
    }

    public async updateUserAvatarHandle(request: ControllerInput): Promise<ControllerOutput<IGetUserOutput>> {
        const { files } = request;
        const id = request.user?.id;

        if (!files) throw new AppError('Avatar not allowed')

        const user = await this.usersService.getUpdateUserAvatar().execute({
            user_id: id as string,
            avatar: files
        })

        return {
            data: UserPresentation.getUserResponse(user)
        }
    }

    public async UpdateUserHandle(request: ControllerInput<Omit<IUpdateUserServiceDTO, 'id'>>): Promise<ControllerOutput<IGetUserOutput>> {
        const id = request.user?.id


        const user = await this.usersService.getUpdateUser().execute({ id: id as string, ...request.data })

        return {
            data: UserPresentation.getUserResponse(user)
        }
    }

    public async createUserHandle(request: ControllerInput<ICreateUserServiceDTO>): Promise<ControllerOutput<IGetUserOutput>> {
        const user = await this.usersService.getCreateUser().execute(request.data);

        return {
            data: UserPresentation.getUserResponse(user)
        }
    }

    public async createUserSessionHandle(resquest: ControllerInput<ICreateUserSessionServiceDTO>): Promise<ControllerOutput<ICreateSessionResponse>> {
        const token = await this.usersService.getCreateSession().execute(resquest.data)

        return {
            data: {
                ...token,
                userExits: UserPresentation.getUserResponse(token.userExits)
            }
        }
    }
}


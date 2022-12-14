import { AbstractRoute } from "../../../../../shared/infra/routes/AbstractRoute";
import { HttpMethod, IRouteMethod } from "../../../../../shared/infra/routes/IRoutesMethod";
import { UserValidation } from "../../../validation/UserValidation";
import { UserController } from "../controller/UserController";
import { UserControllerFactory } from "../controller/UserControllerFactory";


class UserRoutes extends AbstractRoute<UserController, UserValidation> {
    protected RouteMethods: IRouteMethod<UserController, UserValidation> = {
        prefix: 'user',
        routesConfig: [
            {
                method: HttpMethod.POST,
                url: '/',
                controller: 'createUserHandle',
                validation: 'validateCreateUser',
            },
            {
                method: HttpMethod.POST,
                url: '/session',
                controller: 'createUserSessionHandle',
                validation: 'validationCreateSession'
            },
            {
                method: HttpMethod.PATCH,
                url: '/avatar',
                controller: 'updateUserAvatarHandle',
                authentication: true,
            },
            {
                method: HttpMethod.PUT,
                url: '/',
                controller: 'UpdateUserHandle',
                authentication: true,
                validation: 'validateUpdateUser'
            },
            {
                method: HttpMethod.GET,
                url: '/:userId',
                controller: 'showUserHandle',
                authentication: true,
                validation: 'validationShowUser'
            }
        ]
    }

    constructor(userController: UserController) {
        super(userController, UserValidation);
    }
}

export const userRoute = new UserRoutes(UserControllerFactory());
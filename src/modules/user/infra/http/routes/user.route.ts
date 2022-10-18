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
                url: '/',
                controller: 'updateUserAvatarHandle',
                authentication: true,
            }
        ]
    }

    constructor(userController: UserController) {
        super(userController, UserValidation);
    }
}

export const userRoute = new UserRoutes(UserControllerFactory());
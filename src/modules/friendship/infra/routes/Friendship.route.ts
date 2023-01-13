import { AbstractRoute } from "../../../../shared/infra/routes/AbstractRoute";
import { HttpMethod, IRouteMethod } from "../../../../shared/infra/routes/IRoutesMethod";
import { FriendshipController } from "../controller/FriendshipController";
import { FriendshipControllerFactory } from "../controller/FriendshipControllerFactory";
import { FriendshipValidation } from "../validator/FriendshipValidation";

class FriendshipRoute extends AbstractRoute<FriendshipController, FriendshipValidation> {
    protected RouteMethods: IRouteMethod<FriendshipController, FriendshipValidation> = {
        prefix: 'friendship',
        routesConfig: [
            {
                method: HttpMethod.POST,
                controller: 'createFriendshipHandle',
                url: '/:friendId',
                validation: 'createFriendshipRequestValidate',
                authentication: true
            },
            {
                method: HttpMethod.PATCH,
                controller: 'acceptOrDenyFriendshipHandle',
                url: '/acceptOrDenyRequest',
                validation: 'acceptOrDenyFriendshipRequestValidate',
                authentication: true
            },
            {
                method: HttpMethod.GET,
                controller: 'listFriendshipHandle',
                url: '/',
                authentication: true
            }
        ]
    };

    constructor(friendshipController: FriendshipController) {
        super(friendshipController)
    }
}

export const friendshipRoute = new FriendshipRoute(FriendshipControllerFactory());
import { AbstractRoute } from "../../../../shared/infra/routes/AbstractRoute";
import { HttpMethod, IRouteMethod } from "../../../../shared/infra/routes/IRoutesMethod";
import { FriendshipController } from "../controller/FriendshipController";
import { FriendshipControllerFactory } from "../controller/FriendshipControllerFactory";

class FriendshipRoute extends AbstractRoute<FriendshipController> {
    protected RouteMethods: IRouteMethod<FriendshipController, undefined> = {
        prefix: 'friendship',
        routesConfig: [
            {
                method: HttpMethod.POST,
                controller: 'createFriendshipHandle',
                url: '/:friendId',
                authentication: true
            },
        ]
    };

    constructor(friendshipController: FriendshipController) {
        super(friendshipController)
    }
}

export const friendshipRoute = new FriendshipRoute(FriendshipControllerFactory());
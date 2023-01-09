import { friendshipRoute } from "../../../modules/friendship/infra/routes/Friendship.route";
import { notificationRoute } from "../../../modules/notification/infra/routes/notification.route";
import { postRoute } from "../../../modules/post/infra/routes/post.route";
import { userRoute } from "../../../modules/user/infra/http/routes/user.route";
import { IRoute } from "./IRoute";


export const routesList: IRoute[] = [
    userRoute,
    postRoute,
    notificationRoute,
    friendshipRoute
]

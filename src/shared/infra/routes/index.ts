import { notificationRoute } from "../../../modules/notification/infra/routes/notification.route";
import { postRoute } from "../../../modules/post/infra/routes/post.route";
import { userRoute } from "../../../modules/user/infra/http/routes/user.route";
import { AbstractController } from "../../controller/AbstractController";
import { IRoute } from "./IRoute";


export const routesList: IRoute<AbstractController>[] = [
    userRoute,
    postRoute,
    notificationRoute
]

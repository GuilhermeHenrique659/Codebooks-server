import { AbstractRoute } from "../../../../shared/infra/routes/AbstractRoute";
import { HttpMethod, IRouteMethod } from "../../../../shared/infra/routes/IRoutesMethod";
import { NotificationController } from "../controller/NotificationController";
import { NotificationControllerFactory } from "../controller/NotificationControllerFactory";


export class NotificationRoute extends AbstractRoute<NotificationController> {
    protected RouteMethods: IRouteMethod<NotificationController, undefined> = {
        prefix: 'notifications',
        routesConfig: [
            {
                method: HttpMethod.GET,
                url: '/',
                controller: 'listNotificationHandle',
                authentication: true,
            }
        ]
    };

    constructor(notificationController: NotificationController) {
        super(notificationController)
    }
}

export const notificationRoute = new NotificationRoute(NotificationControllerFactory());
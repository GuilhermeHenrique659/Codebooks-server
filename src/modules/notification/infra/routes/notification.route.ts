import { AbstractRoute } from "../../../../shared/infra/routes/AbstractRoute";
import { HttpMethod, IRouteMethod } from "../../../../shared/infra/routes/IRoutesMethod";
import { NotificationController } from "../controller/NotificationController";
import { NotificationControllerFactory } from "../controller/NotificationControllerFactory";
import { NotificationValidation } from "../validation/NotificationValidation";


export class NotificationRoute extends AbstractRoute<NotificationController, NotificationValidation> {
    protected RouteMethods: IRouteMethod<NotificationController, NotificationValidation> = {
        prefix: 'notifications',
        routesConfig: [
            {
                method: HttpMethod.GET,
                url: '/',
                controller: 'listNotificationHandle',
                authentication: true,
            },
            {
                method: HttpMethod.DELETE,
                url: '/:notificationId',
                controller: 'deleteNotificationHandle',
                authentication: true,
                validation: 'validateDeleteNotification'
            }
        ]
    };

    constructor(notificationController: NotificationController) {
        super(notificationController, NotificationValidation)
    }
}

export const notificationRoute = new NotificationRoute(NotificationControllerFactory());
import { app } from "../../../../shared/infra/http";
import { IObserver } from "../../../../shared/observer/IObserver";
import { ICreateFriendshipRequestNotificationDTO } from "../../domain/service/CreateFriendshipRequestNotification/ICreateFriendshipRequestNotificationDTO";
import { NotificationControllerFactory } from "../controller/NotificationControllerFactory";


export class FriendshipRequestObserver implements IObserver {
    public async update(data: ICreateFriendshipRequestNotificationDTO): Promise<void> {
        const notification = await NotificationControllerFactory().createFriendshipRequestHandle({ data: data });

        app.getListener().sendEvents(data.friendshipId, 'notification', notification);
    }
}
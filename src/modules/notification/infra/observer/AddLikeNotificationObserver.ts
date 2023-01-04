import { app } from "../../../../shared/infra/http";
import { IObserver } from "../../../../shared/observer/IObserver";
import { NotificationControllerFactory } from "../controller/NotificationControllerFactory";

export class AddLikeNotificationObserver implements IObserver {
    public async update(postId: string): Promise<void> {
        const notification = await NotificationControllerFactory().createPostLikeNotificationHandle({
            data: {
                postId
            },
        })
        app.getListener().sendEvents(notification.user_id, 'notification', notification);
    }
}
import { IPostRepository } from "../../../post/domain/repositories/IPostRepostirory";
import { INotificationRepository } from "../repositories/INotificationRepository";
import { CreatePostLikeNotificationService } from "./CreatePostLikeNotification/CreatePostLikeNotificationService";
import { ListNotificationService } from "./ListNotificationService/ListNotificationService";

export class NotificationServiceFactory {
    constructor(private postRepository: IPostRepository,
        private notificationRepository: INotificationRepository) { }

    public getCreatePostLikeNotifcation() {
        return new CreatePostLikeNotificationService(this.notificationRepository, this.postRepository);
    }

    public getListNotificationService() {
        return new ListNotificationService(this.notificationRepository);
    }
}

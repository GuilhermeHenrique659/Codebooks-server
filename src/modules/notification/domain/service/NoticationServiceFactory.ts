import { IPostRepository } from "../../../post/domain/repositories/IPostRepostirory";
import { INotificationRepository } from "../repositories/INotificationRepository";
import { CreateFriendshipRequestNotificationService } from "./CreateFriendshipRequestNotification/CreateFriendshipRequestNotificationService";
import { CreatePostLikeNotificationService } from "./CreatePostLikeNotification/CreatePostLikeNotificationService";
import { DeleteNofiticationService } from "./DeleteNotificationService/DeleteNotificationService";
import { ListNotificationService } from "./ListNotificationService/ListNotificationService";

export class NotificationServiceFactory {
    constructor(private postRepository: IPostRepository,
        private notificationRepository: INotificationRepository) { }

    public getCreatePostLikeNotifcation() {
        return new CreatePostLikeNotificationService(this.notificationRepository, this.postRepository);
    }

    public getCreateRequestFriendshipNotification() {
        return new CreateFriendshipRequestNotificationService(this.notificationRepository);
    }

    public getListNotificationService() {
        return new ListNotificationService(this.notificationRepository);
    }

    public getDeleteNotificationService() {
        return new DeleteNofiticationService(this.notificationRepository);
    }
}

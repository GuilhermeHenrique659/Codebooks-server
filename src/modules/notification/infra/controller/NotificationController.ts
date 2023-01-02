import { ControllerInput } from "../../../../shared/adapter/ControllerBoundary";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { Notification } from "../../domain/entities/Notification";
import { ICreatePostLikeNotificationDTO } from "../../domain/service/CreatePostLikeNotification/CreatePostLikeNotificationDTO";
import { IDeleteNotificationServiceDTO } from "../../domain/service/DeleteNotificationService/IDeleteNotificationServiceDTO";
import { NotificationServiceFactory } from "../../domain/service/NoticationServiceFactory";


export class NotificationController extends AbstractController {
    constructor(private notificationServiceFactory: NotificationServiceFactory) {
        super();
    }

    public async createPostLikeNotificationHandle(request: ControllerInput<ICreatePostLikeNotificationDTO>): Promise<Notification> {
        const { postId } = request.data
        const notification = await this.notificationServiceFactory.getCreatePostLikeNotifcation().execute({ postId });

        return notification
    }

    public async listNotificationHandle(request: ControllerInput): Promise<Notification[]> {
        const id = request.user?.id as string;
        const notifiactions = await this.notificationServiceFactory.getListNotificationService().execute(id);

        return notifiactions
    }

    public async deleteNotificationHandle(request: ControllerInput<IDeleteNotificationServiceDTO>): Promise<{ isDeleted: boolean }> {
        const { notificationId } = request.data
        await this.notificationServiceFactory.getDeleteNotificationService().execute({ notificationId });

        return {
            isDeleted: true
        }
    }
}
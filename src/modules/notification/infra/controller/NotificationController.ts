import { ControllerInput, ControllerOutput } from "../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { Notification } from "../../domain/entities/Notification";
import { ICreatePostLikeNotificationDTO } from "../../domain/service/CreatePostLikeNotification/CreatePostLikeNotificationDTO";
import { NotificationServiceFactory } from "../../domain/service/NoticationServiceFactory";


export class NotificationController extends AbstractController {
    constructor(private notificationServiceFactory: NotificationServiceFactory) {
        super();
    }

    public async createPostLikeNotificationHandle(request: ControllerInput<ICreatePostLikeNotificationDTO>): Promise<ControllerOutput<Notification>> {
        const { postId } = request.data

        const notification = await this.notificationServiceFactory.getCreatePostLikeNotifcation().execute({ postId });

        return {
            data: notification
        }
    }

    public async listNotificationHandle(request: ControllerInput): Promise<ControllerOutput<Notification[]>> {
        const id = request.user?.id as string;

        const notifiactions = await this.notificationServiceFactory.getListNotificationService().execute(id);

        return {
            data: notifiactions
        }
    }
}
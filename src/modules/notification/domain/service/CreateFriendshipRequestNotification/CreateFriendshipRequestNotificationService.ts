import { Notification } from "../../entities/Notification";
import NotificationType from "../../entities/NotificationType";
import { INotificationRepository } from "../../repositories/INotificationRepository";
import { ICreateFriendshipRequestNotificationDTO } from "./ICreateFriendshipRequestNotificationDTO";


export class CreateFriendshipRequestNotificationService {
    constructor(private _notificationRepository: INotificationRepository) { }

    public async execute({ friendId, friendshipId, username }: ICreateFriendshipRequestNotificationDTO): Promise<Notification> {
        const notification = new Notification({
            link: friendshipId,
            message: username + ' invite friendship request',
            type: NotificationType.FRIENDSHIPREQUEST,
            user_id: friendId
        });

        return this._notificationRepository.save(notification);
    }
}
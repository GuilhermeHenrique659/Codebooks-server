import { Notification } from "../entities/Notification";

export interface INotificationRepository {
    save(notification: Notification): Promise<Notification>;
    findAllByUserId(userId: string): Promise<Notification[]>
}
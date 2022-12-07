import { Notification } from "../entities/Notification";

export interface INotificationRepository {
    save(notification: Notification): Promise<Notification>;
    findAllByUserId(userId: string): Promise<Notification[]>;
    findById(notificationId: string): Promise<Notification | null>
    remove(notification: Notification): Promise<void>;
}
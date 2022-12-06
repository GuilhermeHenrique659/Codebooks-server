import { IRepositoryAdapter } from "../../../../shared/adapter/IRepositoryAdapter";
import { Notification } from "../entities/Notification";
import { INotificationRepository } from "./INotificationRepository";

export class NotificationRepository implements INotificationRepository {
    constructor(private _notificationDatasource: IRepositoryAdapter<Notification>) { }

    public async save(notification: Notification): Promise<Notification> {
        return this._notificationDatasource.save(notification);
    }

    public async findAllByUserId(userId: string): Promise<Notification[]> {
        return this._notificationDatasource.find({
            where: {
                user_id: userId
            }
        });
    }
}
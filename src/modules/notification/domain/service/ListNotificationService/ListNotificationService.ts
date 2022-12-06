import { Notification } from "../../entities/Notification";
import { INotificationRepository } from "../../repositories/INotificationRepository";


export class ListNotificationService {
    constructor(private _notificationRepository: INotificationRepository) { }

    public async execute(userId: string): Promise<Notification[]> {
        return this._notificationRepository.findAllByUserId(userId);
    }
}
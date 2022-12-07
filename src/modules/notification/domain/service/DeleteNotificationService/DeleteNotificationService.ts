import AppError from "../../../../../shared/errors/AppError";
import { INotificationRepository } from "../../repositories/INotificationRepository";
import { IDeleteNotificationServiceDTO } from "./IDeleteNotificationServiceDTO";

export class DeleteNofiticationService {
    constructor(private _notificationRepository: INotificationRepository) { }

    public async execute({ notificationId }: IDeleteNotificationServiceDTO): Promise<void> {
        const notification = await this._notificationRepository.findById(notificationId);

        if (!notification) throw new AppError('Notfication not found');

        await this._notificationRepository.remove(notification);
    }
}
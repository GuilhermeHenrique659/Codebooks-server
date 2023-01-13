import { IObserver } from "../../../../shared/observer/IObserver";
import { IDeleteNotificationServiceDTO } from "../../domain/service/DeleteNotificationService/IDeleteNotificationServiceDTO";
import { NotificationControllerFactory } from "../controller/NotificationControllerFactory";

export class DeleteNotificationObserver implements IObserver {
    public async update(data: IDeleteNotificationServiceDTO): Promise<void> {
        await NotificationControllerFactory().deleteNotificationHandle({ data: data });
    }
}
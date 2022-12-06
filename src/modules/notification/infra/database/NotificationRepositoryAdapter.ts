import { Repository } from "typeorm";
import { AbstractRepositoryAdapter } from "../../../../shared/adapter/AbstractRepositoryAdapter";
import { Notification } from "../../domain/entities/Notification";


export class NotificationRepositoryAdapter extends AbstractRepositoryAdapter {
    constructor(notificationOrmRepository: Repository<Notification>) {
        super(notificationOrmRepository, Notification)
    }
}
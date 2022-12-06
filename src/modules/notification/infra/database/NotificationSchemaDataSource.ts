import db from "../../../../shared/infra/database";
import { Notification } from "../../domain/entities/Notification";
import { NotificationEntitySchema } from "./entities/NotificationSchema";
import { NotificationRepositoryAdapter } from "./NotificationRepositoryAdapter";


export const notificationDataSource = db.getDataSource<Notification>(NotificationEntitySchema, NotificationRepositoryAdapter);

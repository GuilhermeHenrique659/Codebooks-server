import { EntitySchema } from "typeorm";
import { Notification } from "../../../domain/entities/Notification";

export const NotificationEntitySchema = new EntitySchema<Notification>({
    name: 'notification',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        message: {
            type: 'text',
        },
        link: {
            type: 'varchar'
        },
        user_id: {
            type: 'uuid',
        },
    }
})
import { Request } from "express";
import Joi from "joi";

export class NotificationValidation {
    public validateDeleteNotification(request: Request) {
        const schema = Joi.object({
            notificationId: Joi.string().uuid().required()
        });

        return schema.validate(request.params, { abortEarly: false });
    }
}
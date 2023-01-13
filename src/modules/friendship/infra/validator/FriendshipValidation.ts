import { Request } from "express";
import Joi from "joi";

export class FriendshipValidation {
    public createFriendshipRequestValidate(request: Request) {
        const schema = Joi.object({
            userId: Joi.string().uuid().required(),
            friendId: Joi.string().uuid().required(),
        });

        return schema.validate(request.params, { abortEarly: false });
    }

    public acceptOrDenyFriendshipRequestValidate(request: Request) {
        const schema = Joi.object({
            friendshipId: Joi.string().uuid().required(),
            notificationId: Joi.string().uuid().required(),
            requestIsAccept: Joi.boolean().default(false),
        });

        return schema.validate(request.body, { abortEarly: false });
    }
}
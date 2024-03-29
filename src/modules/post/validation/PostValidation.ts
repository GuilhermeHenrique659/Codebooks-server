import { Request } from "express";
import Joi from "joi";
import { AbstractValidation } from "../../../shared/validation/AbstractValidation";

export class PostValidation extends AbstractValidation {
    public createPostValidate(request: Request) {
        const Schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        });

        return Schema.validate(request.body);
    }

    public listPostValidate(request: Request) {
        const Schema = Joi.object({
            page: Joi.number(),
            limit: Joi.number(),
            userId: Joi.string(),
        });
        return Schema.validate(request.query);
    }

    public showPostValidate(request: Request) {
        const Schema = Joi.object({
            postId: Joi.string().uuid().required(),
        });

        return Schema.validate(request.params);
    }
}

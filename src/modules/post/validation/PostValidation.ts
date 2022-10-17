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
}
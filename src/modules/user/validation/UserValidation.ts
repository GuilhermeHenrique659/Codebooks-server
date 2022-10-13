import { Request } from "express";
import Joi from "joi";
import { AbstractValidation } from "../../../shared/validation/AbstractValidation";


export class UserValidation extends AbstractValidation {
    public validateCreateUser(request: Request) {
        const Schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        return Schema.validate(request.body, { abortEarly: false });
    }
}
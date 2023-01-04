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

    public validationCreateSession(request: Request) {
        const Schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        return Schema.validate(request.body, { abortEarly: false })
    }

    public validationShowUser(request: Request) {
        const Schema = Joi.object({
            userId: Joi.string().uuid().required(),
        });

        return Schema.validate(request.params, { abortEarly: false });
    }

    public validateUpdateUser(request: Request) {
        const Schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
            passwordToConfirm: Joi.string().required(),
        }).or('name', 'email', 'password');

        return Schema.validate(request.body, { abortEarly: false });
    }
}
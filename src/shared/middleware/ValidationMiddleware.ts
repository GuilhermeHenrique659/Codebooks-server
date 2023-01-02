import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { AbstractValidation } from "../validation/AbstractValidation";
import { ValidationResult } from "joi";


export class ValidationMiddleware<V extends AbstractValidation | undefined> {
    constructor(protected readonly Validator?: new () => V) { }

    public executeValidate = (validateMethod?: keyof V) => (request: Request, response: Response, next: NextFunction) => {
        if (!this.Validator || !validateMethod)
            return next();

        const validation = (new this.Validator() as unknown) as new () => V;
        const methodToBeCall = Reflect.get(validation, validateMethod);

        if (typeof methodToBeCall !== 'function')
            next();

        const { error } = methodToBeCall(request, response, next) as ValidationResult;

        if (error) {
            const errorList: string[] = [];
            error.details.forEach(detail => errorList.push(detail.message));
            throw new AppError(errorList)
        }

        next();
    }
}
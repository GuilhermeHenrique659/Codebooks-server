import { Request, Response } from "express";
import { AbstractController } from "../controller/AbstractController";
import { IHttpRequest } from "./HttpAdabter";


export class ExpressAdapter {
    static RouterAdapter<C extends AbstractController>(controller: C, method: keyof C) {
        return async (request: Request, response: Response) => {
            const httpRequest: IHttpRequest = {
                body: request.body,
                params: request.params,
                user: request.user
            };
            const httpResponse = await controller.exeMethod(method, httpRequest);
            return response.status(200).json(httpResponse.body);
        }
    }
}
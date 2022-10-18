import { Request, Response } from "express";
import { AbstractController } from "../controller/AbstractController";
import { File } from "../types/Files";
import { IHttpRequest } from "./HttpAdabter";


export class ExpressAdapter {
    static FileAdapter(request: Request): File[] | undefined {
        if (!request.files) return
        if (Array.isArray(request.files.file)) {
            return request.files.file.flatMap((file) => {
                return {
                    name: file.name,
                    data: file.data,
                }
            })

        } else {
            return [{
                name: request.files.file.name,
                data: request.files.file.data,
            }]

        }
    }

    static RouterAdapter<C extends AbstractController>(controller: C, method: keyof C) {
        return async (request: Request, response: Response) => {
            const httpRequest: IHttpRequest = {
                body: request.body,
                query: request.query,
                params: request.params,
                user: request.user,
                files: this.FileAdapter(request)
            };
            const httpResponse = await controller.exeMethod(method, httpRequest);
            return response.status(200).json(httpResponse.body);
        }
    }
}
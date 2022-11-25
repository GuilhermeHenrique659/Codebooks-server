import { Request, Response } from "express";
import { AbstractController } from "../controller/AbstractController";
import { SuccessResponse } from "../infra/routes/IRoutesMethod";
import { File } from "../types/Files";
import { ControllerInput } from "./HttpAdabter";


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

    static RouterAdapter<C extends AbstractController>(controller: C, method: keyof C, statusResponse = SuccessResponse.SUCCESS_RESPONSE) {
        return async (request: Request, response: Response) => {
            const controllerInput: ControllerInput = {
                data: { ...request.body, ...request.params, ...request.query },
                user: request.user,
                files: this.FileAdapter(request)
            };
            const controllerOutput = await controller.exeMethod(method, controllerInput);
            return response.status(statusResponse).json(controllerOutput.data);
        }
    }
}
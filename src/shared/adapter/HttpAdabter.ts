import { File } from "../types/Files";

export interface ControllerOutput {
    data: any;
}

export interface ControllerInput<D = any | undefined> {
    data?: any | D
    user: {
        id?: string
    };
    files?: File[]
}
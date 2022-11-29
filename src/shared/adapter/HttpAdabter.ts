import { File } from "../types/Files";

export interface ControllerOutput<T = undefined> {
    data: T;
}

export interface ControllerInput<D = any | undefined> {
    data?: any | D
    user: {
        id?: string
    };
    files?: File[]
}
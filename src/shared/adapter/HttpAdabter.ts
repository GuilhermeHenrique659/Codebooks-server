import { File } from "../types/Files";

export interface ControllerOutput<T = any> {
    data: T;
}

export interface ControllerInput<D = any | undefined> {
    data: D
    user?: {
        id?: string
    };
    files?: File[]
}
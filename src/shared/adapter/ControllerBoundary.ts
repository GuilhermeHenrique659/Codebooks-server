import { File } from "../types/Files";

export interface ControllerInput<D = any | undefined> {
    data: D
    user?: {
        id?: string
    };
    files?: File[]
}
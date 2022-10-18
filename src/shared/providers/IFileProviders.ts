import { File } from "../types/Files";

export interface IFileProvider {
    save(files: File[]): Promise<string[]>;
    remove(filename: string): Promise<void>
}
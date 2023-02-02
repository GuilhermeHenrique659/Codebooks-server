import { Files } from "../entities/File";

export interface IFilesRepository {
    save(file: Files[]): Promise<Files[]>;
}

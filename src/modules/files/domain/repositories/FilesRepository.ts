import { IRepositoryAdapter } from "../../../../shared/adapter/IRepositoryAdapter";
import { Files } from "../entities/File";
import { IFilesRepository } from "./IFilesRepository";

export class FilesRepository implements IFilesRepository {
    constructor(private _dataSource: IRepositoryAdapter<Files>) {}

    public async save(files: Files[]): Promise<Files[]> {
        for (const file of files) {
            this._dataSource.save(file);
        }
        return files;
    }
}

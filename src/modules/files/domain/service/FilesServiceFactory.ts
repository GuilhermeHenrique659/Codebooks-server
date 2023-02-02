import { IFileProvider } from "../../../../shared/providers/IFileProviders";
import { IFilesRepository } from "../repositories/IFilesRepository";
import { CreateFilesService } from "./CreateFilesService/CreateFilesService";

export class FilesServiceFactory {
    constructor(private _fileRepository: IFilesRepository, private _fileProvider: IFileProvider) {}

    public getCreateFileService() {
        return new CreateFilesService(this._fileRepository, this._fileProvider);
    }
}

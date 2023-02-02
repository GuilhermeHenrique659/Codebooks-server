import { IFileProvider } from "../../../../../shared/providers/IFileProviders";
import { File } from "../../../../../shared/types/Files";
import { Files } from "../../entities/File";
import { IFilesRepository } from "../../repositories/IFilesRepository";

export class CreateFilesService {
    constructor(private _filesRepository: IFilesRepository, private _fileProvider: IFileProvider) {}

    public async execute(postId: string, files: File[]): Promise<Files[]> {
        const filenames: string[] = await this._fileProvider.save(files);
        const filesData: Files[] = [];

        filenames.forEach((filename) => {
            filesData.push(
                new Files({
                    filename,
                    postId,
                }),
            );
        });

        return this._filesRepository.save(filesData);
    }
}

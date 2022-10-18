import { IFileProvider } from "./IFileProviders";
import fs from 'fs'
import path from 'path'
import uploadConfig from "../../config/upload";
import { File } from "../types/Files";

export class LocalFilesProvider implements IFileProvider {

    public async save(files: File[]): Promise<string[]> {
        const filenames: string[] = [];
        for (const file of files) {
            const filname = uploadConfig.storage.filename;
            await fs.promises.writeFile(`${uploadConfig.directory}/${filname}.jpg`, file.data);
            filenames.push(filname + '.jpg');
        }
        return filenames;
    }

    public async remove(filename: string): Promise<void> {
        const filePath = path.join(uploadConfig.directory, filename);
        const fileExits = await fs.promises.stat(filePath);
        if (fileExits) {
            await fs.promises.unlink(filePath);
        }
    }
}
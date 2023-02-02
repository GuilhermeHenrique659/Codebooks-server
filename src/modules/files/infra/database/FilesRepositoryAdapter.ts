import { Repository } from "typeorm";
import { AbstractRepositoryAdapter } from "../../../../shared/adapter/AbstractRepositoryAdapter";
import { Files } from "../../domain/entities/File";

export class FilesRepositoryAdapter extends AbstractRepositoryAdapter {
    constructor(repository: Repository<Files>) {
        super(repository, Files);
    }
}

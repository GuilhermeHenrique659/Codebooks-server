import db from "../../../../shared/infra/database";
import { Files } from "../../domain/entities/File";
import { FilesRepositoryAdapter } from "./FilesRepositoryAdapter";
import { FilesSchema } from "./entities/FilesSchema";

export const filesDataSource = db.getDataSource<Files>(FilesSchema, FilesRepositoryAdapter);

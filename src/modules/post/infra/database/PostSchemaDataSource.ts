import { connection } from "../../../../shared/infra/database";
import { Post } from "../../domain/entities/Post";
import { PostEntitySchema } from "./entities/PostSchema";

export const postDataSource = connection.getRepository<Post>(PostEntitySchema);
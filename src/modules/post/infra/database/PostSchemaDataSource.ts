import { connection } from "../../../../shared/infra/database";
import { Post } from "../../domain/entities/Post";
import { PostEntitySchema } from "./entities/PostSchema";
import { PostRepositoryAdapter } from "./PostRepositoryAdapter";

export const postDataSource = new PostRepositoryAdapter(connection.getRepository<Post>(PostEntitySchema));
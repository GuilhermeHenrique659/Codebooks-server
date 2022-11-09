import { connection } from "../../../../shared/infra/database";
import { Like } from "../../domain/entities/Like";
import { LikeEntitySchema } from "./entities/LikeSchema";


export const likeDataSource = connection.getRepository<Like>(LikeEntitySchema);
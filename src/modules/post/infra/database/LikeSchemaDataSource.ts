import db from "../../../../shared/infra/database";
import { Like } from "../../domain/entities/Like";
import { LikeEntitySchema } from "./entities/LikeSchema";


export const likeDataSource = db.getDataSource<Like>(LikeEntitySchema, undefined, true);
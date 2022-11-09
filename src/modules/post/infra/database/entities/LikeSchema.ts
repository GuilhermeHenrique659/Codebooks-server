import { EntitySchema } from "typeorm";
import { Like } from "../../../domain/entities/Like";

export const LikeEntitySchema = new EntitySchema<Like>({
    name: 'user_like_post',
    columns: {
        userId: {
            type: 'uuid',
            primary: true,
        },
        postId: {
            type: 'uuid',
            primary: true,
        }
    },
    indices: [
        {
            name: "IDX_user_like_post",
            unique: true,
            columns: ["userId", "postId"],
        },
    ],
})
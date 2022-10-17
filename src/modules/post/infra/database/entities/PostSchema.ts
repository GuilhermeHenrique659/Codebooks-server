import { EntitySchema } from "typeorm";
import { Post } from "../../../domain/entities/Post";


export const PostEntitySchema = new EntitySchema<Post>({
    name: 'posts',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        like: {
            type: Number
        },
        user_id: {
            type: 'uuid',
        },
        created_at: {
            name: 'created_at',
            type: 'timestamp with time zone',
            createDate: true,
        },
        updated_at: {
            name: 'updated_at',
            type: 'time with time zone',
            updateDate: true,
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'users',
            cascade: true,
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id'
            },
            inverseSide: 'posts'
        }
    }
});

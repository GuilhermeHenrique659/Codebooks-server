import { DataSource } from 'typeorm'
import { LikeEntitySchema } from '../../../modules/post/infra/database/entities/LikeSchema'
import { PostEntitySchema } from '../../../modules/post/infra/database/entities/PostSchema'
import { userEntitySchema } from '../../../modules/user/infra/database/entities/UserSchema'
import { CreateUser1665668135024 } from './migrations/1665668135024-CreateUser'
import { CreatePost1666009543896 } from './migrations/1666009543896-CreatePost'
import { AddUserInPost1666009768966 } from './migrations/1666009768966-AddUserInPost'
import { CreateLike1667828962841 } from './migrations/1667828962841-CreateLike'

export const connection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "codebooks",
    synchronize: true,
    logging: false,
    migrations: [
        CreateUser1665668135024,
        CreatePost1666009543896,
        CreateLike1667828962841,
        AddUserInPost1666009768966
    ],
    entities: [
        userEntitySchema,
        PostEntitySchema,
        LikeEntitySchema,
    ]
})
import { DataSource } from 'typeorm'
import { PostEntitySchema } from '../../../modules/post/infra/database/entities/PostSchema'
import { userEntitySchema } from '../../../modules/user/infra/database/entities/UserSchema'
import { CreateUser1665668135024 } from './migrations/1665668135024-CreateUser'
import { CreatePost1666009543896 } from './migrations/1666009543896-CreatePost'
import { AddUserInPost1666009768966 } from './migrations/1666009768966-AddUserInPost'

export const connection = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3307,
    username: "root",
    password: "",
    database: "db",
    synchronize: true,
    logging: false,
    migrations: [
        CreateUser1665668135024,
        CreatePost1666009543896,
        AddUserInPost1666009768966
    ],
    entities: [
        userEntitySchema,
        PostEntitySchema
    ]
})
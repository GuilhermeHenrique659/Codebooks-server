import { DataSource } from 'typeorm'
import { userEntitySchema } from '../../../modules/user/infra/database/entities/UserSchema'
import { CreateUser1665668135024 } from './migrations/1665668135024-CreateUser'

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
        CreateUser1665668135024
    ],
    entities: [
        userEntitySchema
    ]
})
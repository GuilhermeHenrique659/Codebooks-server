import { DataSource, EntitySchema, ObjectLiteral, Repository } from 'typeorm'
import { NotificationEntitySchema } from '../../../modules/notification/infra/database/entities/NotificationSchema'
import { LikeEntitySchema } from '../../../modules/post/infra/database/entities/LikeSchema'
import { PostEntitySchema } from '../../../modules/post/infra/database/entities/PostSchema'
import { userEntitySchema } from '../../../modules/user/infra/database/entities/UserSchema'
import { AbstractRepositoryAdapter } from '../../adapter/AbstractRepositoryAdapter'
import { IRepositoryAdapter } from '../../adapter/IRepositoryAdapter'
import { MockRepository } from '../../mock/RepositoryMock'
import { CreateUser1665668135024 } from './migrations/1665668135024-CreateUser'
import { CreatePost1666009543896 } from './migrations/1666009543896-CreatePost'
import { AddUserInPost1666009768966 } from './migrations/1666009768966-AddUserInPost'
import { CreateLike1667828962841 } from './migrations/1667828962841-CreateLike'
import { CreateNotification1669988419897 } from './migrations/1669988419897-CreateNotification'
import { AddUserToNotification1669988529548 } from './migrations/1669988529548-AddUserToNotification'
import { CreateFriendship1673021678722 } from './migrations/1673021678722-CreateFriendship'
import { FriendshipEntitySchema } from '../../../modules/friendship/infra/database/entities/FriendshipEntity'


export class DataBase {
    constructor(private connection: DataSource) { }

    public async runMigration() {
        await this.connection.runMigrations()
    }

    public async startDbConnection() {
        await this.connection.initialize()
    }

    public getDataSource<T extends ObjectLiteral>(Entity: EntitySchema<T>,
        repositoryAdapter?: new (repository: Repository<T>) => AbstractRepositoryAdapter,
        useMock = false): IRepositoryAdapter<T> {
        if (!useMock) {
            if (repositoryAdapter) return new repositoryAdapter(this.connection.getRepository<T>(Entity)) as unknown as IRepositoryAdapter<T>;
            return this.connection.getRepository<T>(Entity) as unknown as IRepositoryAdapter<T>;
        } else {
            return new MockRepository<T>();
        }
    }


}

export const connection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "codebooks",
    password: 'docker',
    synchronize: false,
    logging: true,
    migrations: [
        CreateUser1665668135024,
        CreatePost1666009543896,
        CreateLike1667828962841,
        AddUserInPost1666009768966,
        CreateNotification1669988419897,
        AddUserToNotification1669988529548,
        CreateFriendship1673021678722,
    ],
    entities: [
        userEntitySchema,
        PostEntitySchema,
        LikeEntitySchema,
        NotificationEntitySchema,
        FriendshipEntitySchema,
    ]
});

const db = new DataBase(connection);
export default db;
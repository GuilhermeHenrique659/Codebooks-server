import { DataSource, EntitySchema, ObjectLiteral, Repository } from 'typeorm'
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


export class DataBase {
    private connection = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        database: "codebooks",
        password: 'docker',
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
    });

    public startDbConnectiom() {
        this.connection.initialize().then(() => {
            console.log("Database connection complete");
        }).catch((error) => {
            console.error("Database connection failed: " + error)
        });
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


const db = new DataBase();
export default db;
import { DataSource, EntitySchema, ObjectLiteral } from 'typeorm'
import { LikeEntitySchema } from '../../../modules/post/infra/database/entities/LikeSchema'
import { PostEntitySchema } from '../../../modules/post/infra/database/entities/PostSchema'
import { User } from '../../../modules/user/domain/entities/User'
import { userEntitySchema } from '../../../modules/user/infra/database/entities/UserSchema'
import { IEntity } from '../../adapter/IEntity'
import { MockRepository } from '../../mock/RepositoryMock'
import { CreateUser1665668135024 } from './migrations/1665668135024-CreateUser'
import { CreatePost1666009543896 } from './migrations/1666009543896-CreatePost'
import { AddUserInPost1666009768966 } from './migrations/1666009768966-AddUserInPost'
import { CreateLike1667828962841 } from './migrations/1667828962841-CreateLike'


class DataBase {
    private dbOn: boolean = false;
    private connection: DataSource;

    public startDbConnectiom(){
        this.connection = new DataSource({
            type: "mysql",
            host: "127.0.0.1",
            port: 3307,
            username: "root",
            database: "db",
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
        this.connection.initialize().then(() => {
            console.log("Database connection complete");
            this.dbOn = true
        }).catch((error) => {
            console.error("Database connection failed: " + error)
            this.dbOn = false
        });
    }

    public getDatasource<T extends ObjectLiteral>(Entity: EntitySchema<T>) {
        if(this.dbOn){
            return this.connection.getRepository<T>(Entity);
        }else {
            return new MockRepository<T>();
        }
    }


}
const data = new DataBase()
const us = data.getDatasource<User>(userEntitySchema)
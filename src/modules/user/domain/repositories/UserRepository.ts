import { Repository } from "typeorm";
import { IRepositoryAdapter } from "../../../../shared/adapter/IRepositoryAdapter";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";


export class UserRepository implements IUserRepository {

    constructor(private _dataSource: IRepositoryAdapter<User>) { }

    public async store(user: User): Promise<User> {
        return this._dataSource.save(user)
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this._dataSource.findOne({
            where: {
                email: email,
            },
        });
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this._dataSource.findOne({
            where: {
                id: id,
            },
        });
        if (user) return new User(user, user.id);
        return user
    }
}
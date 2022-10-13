import { Repository } from "typeorm";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";


export class UserRepository implements IUserRepository {

    constructor(private _dataSource: Repository<User>) { }

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
        return this._dataSource.findOne({
            where: {
                id: id,
            },
        });
    }
}
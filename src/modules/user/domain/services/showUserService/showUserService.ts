import AppError from "../../../../../shared/errors/AppError";
import { IService } from "../../../../../shared/services/IService";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IShowUserService } from "./IShowUserService";

export class ShowUserService implements IService {
    constructor(private _userRepository: IUserRepository) { }

    public async execute(data: IShowUserService): Promise<User> {
        const user = await this._userRepository.findById(data.userId);

        if (!user) throw new AppError('User not found!');

        return user;
    }
}
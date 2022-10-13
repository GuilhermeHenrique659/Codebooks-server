import AppError from "../../../../../shared/errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserServiceDTO } from "./CreateUserServiceDTO";

export class CreateUserService {
    constructor(private _userRepository: IUserRepository) { }

    public async execute(data: ICreateUserServiceDTO): Promise<User> {
        const emailExists = await this._userRepository.findByEmail(data.email)

        if (emailExists) throw new AppError('Email already Exists');

        const user = new User({
            email: data.email,
            name: data.name,
            password: data.password
        });

        return this._userRepository.store(user);
    }
}
import AppError from "../../../../../shared/errors/AppError";
import { User } from "../../entities/User";
import { IHashProvider } from "../../providers/IHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserServiceDTO } from "./CreateUserServiceDTO";

export class CreateUserService {
    constructor(private _userRepository: IUserRepository, private _hashProvider: IHashProvider) {}

    public async execute(data: ICreateUserServiceDTO): Promise<User> {
        const emailExists = await this._userRepository.findByEmail(data.email);

        if (emailExists) throw new AppError("Email already Exists");

        const password = await this._hashProvider.generateHash(data.password);
        const user = new User({
            email: data.email,
            name: data.name,
            password: password,
        });

        return this._userRepository.store(user);
    }
}

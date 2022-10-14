import AppError from "../../../../../shared/errors/AppError";
import { IService } from "../../../../../shared/services/IService";
import { AuthenticateProvider } from "../../providers/AuthenticateProvider";
import { IHashProvider } from "../../providers/IHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserSessionServiceDTO } from "./CreateUserSessionServiceDTO";



export class CreateUserSessionService implements IService {
    constructor(private _userRepository: IUserRepository,
        private _hashProvider: IHashProvider) { }

    public async execute(data: ICreateUserSessionServiceDTO) {
        const userExits = await this._userRepository.findByEmail(data.email);

        if (!userExits) throw new AppError('Email incorrect. User not Found');

        if (!(await this._hashProvider.compareHash(data.password, userExits.password)))
            throw new AppError('Password Incorrect!');

        const token = AuthenticateProvider.sing(userExits);

        return {
            userExits,
            token
        }
    }
}
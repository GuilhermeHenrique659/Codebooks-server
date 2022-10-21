import AppError from "../../../../../shared/errors/AppError";
import { User } from "../../entities/User";
import { IHashProvider } from "../../providers/IHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUpdateUserServiceDTO } from "./UpdateUserServiceDTO";


export class UpdateUserService {
    constructor(private _userRepository: IUserRepository,
        private _hashProvider: IHashProvider){}

    public async execute(data: IUpdateUserServiceDTO): Promise<User>{
        const user = await this._userRepository.findById(data.id);

        if(!user) throw new AppError('User not found');

        if(!(await this._hashProvider.compareHash(user.password, data.passwordToConfirm)))
            throw new AppError('Password Incorrect!'); 

        if (data.email) {
                const EmailExists = await this._userRepository.findByEmail(data.email);
    
                if (EmailExists) {
                    if (EmailExists.email !== user.email) throw new AppError('Email already used');
                }
        }

        if(data.password) user.password = await this._hashProvider.generateHash(data.password);

        user.setName(data.name);
        user.setEmail(data.email);

        return this._userRepository.store(user);
    }
}
import AppError from "../../../../../shared/errors/AppError";
import { IFileProvider } from "../../../../../shared/providers/IFileProviders";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUpdateUserAvatarServiceDTO } from "./UpdateUserAvatarServiceDTO";



export class UpdateUserAvatarService {
    constructor(private _userRepository: IUserRepository,
        private _fileProvider: IFileProvider) { }

    public async execute({ user_id, avatar }: IUpdateUserAvatarServiceDTO): Promise<User> {
        const user = await this._userRepository.findById(user_id);

        if (!user) throw new AppError('User not Found!');

        if (user.avatar) await this._fileProvider.remove(user.avatar);

        const [userAvatar] = await this._fileProvider.save(avatar);

        user.avatar = userAvatar;

        return this._userRepository.store(user);
    }
}
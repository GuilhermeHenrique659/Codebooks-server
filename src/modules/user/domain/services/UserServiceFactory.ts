import { IFileProvider } from "../../../../shared/providers/IFileProviders";
import { IAbstractServiceFactory } from "../../../../shared/services/IAbstractServiceFactory";
import { IService } from "../../../../shared/services/IService";
import { IHashProvider } from "../providers/IHashProvider";
import { IUserRepository } from "../repositories/IUserRepository";
import { CreateUserService } from "./createUserServices/CreateUserService";
import { CreateUserSessionService } from "./createUserSessionService/CreateUserSessionService";
import { UpdateUserAvatarService } from "./updateUserAvatarService/UpdateUserAvatarService";

export class UserServiceFactory implements IAbstractServiceFactory {
    constructor(private _userRepository: IUserRepository,
        private _hashProvider: IHashProvider,
        private _fileProvider: IFileProvider) { }

    public getCreateUser(): IService {
        return new CreateUserService(this._userRepository, this._hashProvider);
    }

    public getCreateSession(): IService {
        return new CreateUserSessionService(this._userRepository, this._hashProvider);
    }

    public getUpdateUserAvatar() {
        return new UpdateUserAvatarService(this._userRepository, this._fileProvider);
    }

}
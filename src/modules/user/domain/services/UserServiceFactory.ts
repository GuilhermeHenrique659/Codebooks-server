import { IFileProvider } from "../../../../shared/providers/IFileProviders";
import { IAbstractServiceFactory } from "../../../../shared/services/IAbstractServiceFactory";
import { IHashProvider } from "../providers/IHashProvider";
import { IUserRepository } from "../repositories/IUserRepository";
import { CreateUserService } from "./createUserServices/CreateUserService";
import { CreateUserSessionService } from "./createUserSessionService/CreateUserSessionService";
import { ShowUserService } from "./showUserService/showUserService";
import { UpdateUserAvatarService } from "./updateUserAvatarService/UpdateUserAvatarService";
import { UpdateUserService } from "./updateUserService/UpdateUserService";

export class UserServiceFactory implements IAbstractServiceFactory {
    constructor(private _userRepository: IUserRepository,
        private _hashProvider: IHashProvider,
        private _fileProvider: IFileProvider) { }

    public getCreateUser() {
        return new CreateUserService(this._userRepository, this._hashProvider);
    }

    public getCreateSession() {
        return new CreateUserSessionService(this._userRepository, this._hashProvider);
    }

    public getUpdateUserAvatar() {
        return new UpdateUserAvatarService(this._userRepository, this._fileProvider);
    }

    public getUpdateUser() {
        return new UpdateUserService(this._userRepository, this._hashProvider);
    }

    public getShowUser() {
        return new ShowUserService(this._userRepository);
    }

}
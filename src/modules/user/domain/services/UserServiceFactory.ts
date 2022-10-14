import { IAbstractServiceFactory } from "../../../../shared/services/IAbstractServiceFactory";
import { IService } from "../../../../shared/services/IService";
import { IHashProvider } from "../providers/IHashProvider";
import { IUserRepository } from "../repositories/IUserRepository";
import { CreateUserService } from "./createUserServices/CreateUserService";
import { CreateUserSessionService } from "./createUserSessionService/CreateUserSessionService";

export class UserServiceFactory implements IAbstractServiceFactory {
    constructor(private _userRepository: IUserRepository,
        private _hashProvider: IHashProvider) { }

    public getCreateUser(): IService {
        return new CreateUserService(this._userRepository, this._hashProvider);
    }

    public getCreateSession(): IService {
        return new CreateUserSessionService(this._userRepository, this._hashProvider);
    }
}
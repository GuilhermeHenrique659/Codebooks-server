import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { IFriendshipRepository } from "../repositories/IFriendshipRepository";
import { CreateFriendshipService } from "./createFriendshipService/CreateFriendshipService";

export class FriendshipServiceFactory {
    constructor(private _userRepository: IUserRepository, private _friendshipRepository: IFriendshipRepository) { }

    public getCreateFriendship(): CreateFriendshipService {
        return new CreateFriendshipService(this._friendshipRepository, this._userRepository);
    }
}
import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { IFriendshipRepository } from "../repositories/IFriendshipRepository";
import { AcceptFriendshipRequestService } from "./acceptFriendshipRequestService/AcceptFriendshipRequestService";
import { CreateFriendshipService } from "./createFriendshipService/CreateFriendshipService";
import { DenyFriendshipRequestService } from "./denyFriendshipRequestService/DenyFriendshipRequestService";
import { ListFriendshipService } from "./listFriendshipService/ListFriendsipService";

export class FriendshipServiceFactory {
    constructor(private _userRepository: IUserRepository, private _friendshipRepository: IFriendshipRepository) { }

    public getCreateFriendship(): CreateFriendshipService {
        return new CreateFriendshipService(this._friendshipRepository, this._userRepository);
    }

    public getAcceptFriendship(): AcceptFriendshipRequestService {
        return new AcceptFriendshipRequestService(this._friendshipRepository);
    }

    public getListFriendship(): ListFriendshipService {
        return new ListFriendshipService(this._friendshipRepository);
    }

    public getDenyFriendship(): DenyFriendshipRequestService {
        return new DenyFriendshipRequestService(this._friendshipRepository);
    }
}
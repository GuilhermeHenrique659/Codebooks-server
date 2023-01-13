import { Friendship } from "../../entities/Friendship";
import { IFriendshipRepository } from "../../repositories/IFriendshipRepository";

export class ListFriendshipService {
    constructor(private _friendshipRepository: IFriendshipRepository) { }

    public async execute(userId: string): Promise<Friendship[]> {
        return this._friendshipRepository.find(userId);
    }
}
import { IRepositoryAdapter } from "../../../../shared/adapter/IRepositoryAdapter";
import { Friendship } from "../entities/Friendship";
import { IFriendshipRepository } from "./IFriendshipRepository";

export class FriendshipRepository implements IFriendshipRepository {
    constructor(private _datasource: IRepositoryAdapter<Friendship>) { }

    public async save(friendship: Friendship): Promise<Friendship | null> {
        return await this._datasource.save(friendship);
    }
}
import { IRepositoryAdapter } from "../../../../shared/adapter/IRepositoryAdapter";
import { Friendship } from "../entities/Friendship";
import { IFriendshipRepository } from "./IFriendshipRepository";

export class FriendshipRepository implements IFriendshipRepository {
    constructor(private _datasource: IRepositoryAdapter<Friendship>) { }

    public async save(friendship: Friendship): Promise<Friendship> {
        return await this._datasource.save(friendship);
    }

    public async findById(friendshipId: string): Promise<Friendship | null> {
        return await this._datasource.findOne({
            where: {
                id: friendshipId
            }
        })
    }

    public async find(userId: string): Promise<Friendship[]> {
        const friend1 = await this._datasource.find({
            where: {
                user_id: userId,
                requestIsAccept: true
            },
            relations: {
                friend: true
            },
        });

        const friend2 = await this._datasource.find({
            where: {
                friend_id: userId,
                requestIsAccept: true
            },
            relations: {
                user: true
            },
        });

        return [...friend1, ...friend2]
    }

    public async remove(friendship: Friendship): Promise<void> {
        await this._datasource.remove(friendship);
    }
}
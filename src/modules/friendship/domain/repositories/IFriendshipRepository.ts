import { Friendship } from "../entities/Friendship";

export interface IFriendshipRepository {
    save(friendship: Friendship): Promise<Friendship>;
    findById(friendshipId: string): Promise<Friendship | null>;
    remove(friendship: Friendship): Promise<void>;
    find(userId: string): Promise<Friendship[]>;
}
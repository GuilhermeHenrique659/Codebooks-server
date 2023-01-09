import { Friendship } from "../entities/Friendship";

export interface IFriendshipRepository {
    save(friendship: Friendship): Promise<Friendship | null>;
}
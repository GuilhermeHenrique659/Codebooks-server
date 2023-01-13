import { Friendship } from "../../domain/entities/Friendship";

export class FriendshipPresentation {
    static listFriendshipt(friends: Friendship[]) {
        return friends.map((friend) => {
            return {
                ...friend,
                user: friend.user ? {
                    id: friend.user.id,
                    name: friend.user.name,
                    avatar: friend.user.avatar,
                } : {
                    id: friend.friend.id,
                    name: friend.friend.name,
                    avatar: friend.friend.avatar,
                }
            }
        })
    }
}
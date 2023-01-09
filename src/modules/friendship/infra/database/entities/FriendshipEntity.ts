import { EntitySchema } from "typeorm";
import { Friendship } from "../../../domain/entities/Friendship";


export const FriendshipEntitySchema = new EntitySchema<Friendship>({
    name: 'friendship',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        user_id: {
            type: 'uuid'
        },
        friend_id: {
            type: 'uuid'
        },
        requestIsAccept: {
            type: 'bool'
        }
    },

    uniques: [
        {
            name: "UK_userId_friendId",
            columns: ["user_id", "friend_id"],
        },
    ],

    relations: {
        user: {
            type: 'many-to-one',
            target: 'users',
            cascade: true,
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id'
            },
        },
        friend: {
            type: 'many-to-one',
            target: 'users',
            cascade: true,
            joinColumn: {
                name: 'friend_id',
                referencedColumnName: 'id'
            },
        },
    }

})
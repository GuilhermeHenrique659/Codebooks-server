import { v4 as uuidv4 } from 'uuid';
import { IEntity } from "../../../../shared/adapter/IEntity";
import { User } from '../../../user/domain/entities/User';

export class Friendship implements IEntity {
    public readonly id: string;

    public user_id: string;

    public user: User;

    public friend_id: string;

    public friend: User;

    public requestIsAccept: boolean;

    constructor(props: Omit<Friendship, keyof Friendship | 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id)
            this.id = uuidv4();
    }
}
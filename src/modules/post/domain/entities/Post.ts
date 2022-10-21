import { User } from "../../../user/domain/entities/User";
import { v4 as uuidv4 } from 'uuid';
import { IEntity } from "../../../../shared/adapter/IEntity";


export class Post implements IEntity {
    public readonly id: string;

    public title: string;

    public description: string;

    public like: number;

    public user: User;

    public user_id: string;

    public created_at?: Date;

    public updated_at?: Date;

    constructor(props: Omit<Post, keyof Post | 'id'>, id?: string) {
        Object.assign(this, props);
        if (!id) {
            this.id = uuidv4();
        }
    }
}
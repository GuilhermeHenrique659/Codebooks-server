import { v4 as uuidv4 } from 'uuid';
import { IEntity } from '../../../../shared/adapter/IEntity';
import { Post } from '../../../post/domain/entities/Post';

export class User implements IEntity {
    public readonly id: string;

    public name: string;

    public email: string;

    public password: string;

    public posts: Post[];

    public avatar?: string;

    constructor(props: Omit<User, 'id' | keyof User>, id?: string) {
        Object.assign(this, props);
        if (!id)
            this.id = uuidv4();
    }

    public setName(name?: string): void {
        if (name) this.name = name
    }

    public setEmail(email?: string): void {
        if (email) this.email = email
    }
}
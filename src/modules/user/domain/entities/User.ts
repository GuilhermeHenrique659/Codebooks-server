import { v4 as uuidv4 } from 'uuid';
import { Post } from '../../../post/domain/entities/Post';

export class User {
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
}
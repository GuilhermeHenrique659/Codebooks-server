import { v4 as uuidv4 } from "uuid";
import { IEntity } from "../../../../shared/adapter/IEntity";
import { Post } from "../../../post/domain/entities/Post";

export class Files implements IEntity {
    public id: string;

    public filename: string;

    public post: Post;

    public postId: string;

    constructor(props: Omit<Files, keyof Files | "id">, id?: string) {
        Object.assign(this, props);

        if (!id) this.id = uuidv4();
    }
}

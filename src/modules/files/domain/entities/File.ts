import { IEntity } from "../../../../shared/adapter/IEntity";

export class Files implements IEntity {
    public id: string;

    public filename: string;

    public postId: string
}
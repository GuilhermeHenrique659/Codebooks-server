import { Post } from "../entities/Post";

export interface IPostRepository {
    save(post: Post): Promise<Post>;
    findById(id: string): Promise<Post | null>;
    findAll(): Promise<Post[]>
}
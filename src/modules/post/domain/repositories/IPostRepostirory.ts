import { Like } from "../entities/Like";
import { Post } from "../entities/Post";

export interface SeachParams {
    page: number;
    skip: number;
    take: number;
    userId?: string,
}

export interface IPostPaginate {
    per_page: number;
    total: number;
    current_page: number;
    posts: Post[];
}

export interface IPostRepository {
    save(post: Post): Promise<Post>;
    findById(id: string): Promise<Post | null>;
    findAll({ page, skip, take }: SeachParams): Promise<IPostPaginate>
    addLike(like: Like): Promise<void>
}
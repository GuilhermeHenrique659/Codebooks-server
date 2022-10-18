import { Post } from "../entities/Post";

export interface SeachParams {
    page: number;
    skip: number;
    take: number;
}

export interface IPostPaginate {
    per_page: number;
    total: number;
    current_page: number;
    data: Post[];
}

export interface IPostRepository {
    save(post: Post): Promise<Post>;
    findById(id: string): Promise<Post | null>;
    findAll({ page, skip, take }: SeachParams): Promise<IPostPaginate>
}
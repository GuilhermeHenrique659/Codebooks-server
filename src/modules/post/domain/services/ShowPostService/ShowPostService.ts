import AppError from "../../../../../shared/errors/AppError";
import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepostirory";
import { IShowPostServiceDTO } from "./IShowPostServiceDTO";

export class ShowPostService {
    constructor(private _postRepository: IPostRepository) { }

    public async execute(data: IShowPostServiceDTO): Promise<Post> {
        const post = await this._postRepository.findById(data.postId, true);

        if (!post) throw new AppError('post not found!');

        return post;
    }
}
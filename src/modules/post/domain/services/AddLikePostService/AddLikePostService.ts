import AppError from "../../../../../shared/errors/AppError";
import { Like } from "../../entities/Like";
import { IPostRepository } from "../../repositories/IPostRepostirory";


export class AddLikePostService {
    constructor(private _postRespository: IPostRepository) { }

    public async execute(userId: string, postId: string) {
        try {
            await this._postRespository.addLike(
                new Like({ userId: userId, postId: postId })
            );
            const post = await this._postRespository.findById(postId);

            if (post) {
                post.like = post.like + 1;
                await this._postRespository.save(post);
            }
        } catch {
            throw new AppError('Cant not add more like in this post');
        }
    }
}
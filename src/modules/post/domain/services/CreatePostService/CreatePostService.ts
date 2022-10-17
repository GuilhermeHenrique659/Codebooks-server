import AppError from "../../../../../shared/errors/AppError";
import { IUserRepository } from "../../../../user/domain/repositories/IUserRepository";
import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepostirory";
import { ICreatePostServiceDTO } from "./CreatePostServiceDTO";

export class CreatePostService {
    constructor(private _postRepository: IPostRepository,
        private _userRepository: IUserRepository) { }

    public async execute(data: ICreatePostServiceDTO): Promise<Post> {
        const user = await this._userRepository.findById(data.user_id);

        if (!user) throw new AppError("User dont found");

        const post = new Post(data);

        return this._postRepository.save(post);
    }

}
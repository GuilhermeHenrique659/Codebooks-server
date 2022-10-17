import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepostirory";


export class ListPostService {
    constructor(private _postRepository: IPostRepository) { }

    public async execute(): Promise<Post[]> {
        return this._postRepository.findAll();
    }
}
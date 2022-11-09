import { Post } from "../../entities/Post";
import { IPostPaginate, IPostRepository } from "../../repositories/IPostRepostirory";
import { IListPostServiceDTO } from "./ListPostServiceDTO";


export class ListPostService {
    constructor(private _postRepository: IPostRepository) { }

    public async execute({ page, limit, userId }: IListPostServiceDTO): Promise<IPostPaginate> {
        const take = limit
        const skip = (Number(page) - 1) * take;
        return this._postRepository.findAll({
            page,
            skip,
            take,
            userId
        });
    }
}
import { IRepositoryAdapter } from "../../../../shared/adapter/IRepositoryAdapter";
import { Like } from "../entities/Like";
import { Post } from "../entities/Post";
import { IPostPaginate, IPostRepository, SeachParams } from "./IPostRepostirory";


export class PostRepository implements IPostRepository {
    constructor(private _postDataSource: IRepositoryAdapter<Post>,
        private _likeDataSource: IRepositoryAdapter<Like>) { }

    public async save(post: Post): Promise<Post> {
        return this._postDataSource.save(post);
    }

    public async findAll({ page, skip, take, userId }: SeachParams): Promise<IPostPaginate> {
        const posts = await this._postDataSource.find({
            ...(userId && { where: { user_id: userId } }),
            relations: {
                user: true
            },
            skip: skip,
            take: take,
            order: {
                created_at: 'DESC'
            }
        });
        const count = await this._postDataSource.count();

        return {
            per_page: take,
            total: count,
            current_page: page,
            posts
        }
    }

    public async addLike(like: Like): Promise<void> {
        await this._likeDataSource.insert(like)
    }

    public async findById(id: string, includedRelationShip = false): Promise<Post | null> {
        return this._postDataSource.findOne({
            where: {
                id: id
            },
            relations: {
                user: includedRelationShip
            },
        })
    }
}
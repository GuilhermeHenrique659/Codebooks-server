import { Repository } from "typeorm";
import { Post } from "../entities/Post";
import { IPostPaginate, IPostRepository, SeachParams } from "./IPostRepostirory";


export class PostRepository implements IPostRepository {
    constructor(private _dataSource: Repository<Post>) { }

    public async save(post: Post): Promise<Post> {
        return this._dataSource.save(post);
    }

    public async findAll({ page, skip, take }: SeachParams): Promise<IPostPaginate> {
        const posts = await this._dataSource.find({
            relations: {
                user: true
            },
            skip: skip,
            take: take,
            order: {
                created_at: 'DESC'
            }
        });
        const count = await this._dataSource.count();

        return {
            per_page: take,
            total: count,
            current_page: page,
            data: posts
        }


    }

    public async findById(id: string): Promise<Post | null> {
        return this._dataSource.findOne({
            where: {
                id: id
            }
        })
    }
}
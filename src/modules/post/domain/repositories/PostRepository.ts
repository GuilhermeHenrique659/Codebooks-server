import { Repository } from "typeorm";
import { Post } from "../entities/Post";
import { IPostRepository } from "./IPostRepostirory";


export class PostRepository implements IPostRepository {
    constructor(private _dataSource: Repository<Post>) { }

    save(post: Post): Promise<Post> {
        return this._dataSource.save(post);
    }

    findAll(): Promise<Post[]> {
        return this._dataSource.find({
            relations: {
                user: true
            },
            order: {
                created_at: 'DESC'
            }
        });
    }

    findById(id: string): Promise<Post | null> {
        return this._dataSource.findOne({
            where: {
                id: id
            }
        })
    }
}
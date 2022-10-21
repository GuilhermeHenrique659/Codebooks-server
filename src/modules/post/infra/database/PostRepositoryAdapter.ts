import { Repository } from "typeorm";
import { AbstractRepositoryAdapter } from "../../../../shared/adapter/AbstractRepositoryAdapter";
import { Post } from "../../domain/entities/Post";

export class PostRepositoryAdapter extends AbstractRepositoryAdapter {
    constructor(private _postOrmRepository: Repository<Post>) {
        super(_postOrmRepository, Post);
    }
}
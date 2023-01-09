import { Repository } from "typeorm";
import { AbstractRepositoryAdapter } from "../../../../shared/adapter/AbstractRepositoryAdapter";
import { Friendship } from "../../domain/entities/Friendship";

export class FriendshipRepositoryAdapter extends AbstractRepositoryAdapter {
    constructor(frienshipOrmRepository: Repository<Friendship>) {
        super(frienshipOrmRepository, Friendship);
    }
}
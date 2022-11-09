import { Repository } from "typeorm";
import { AbstractRepositoryAdapter } from "../../../../shared/adapter/AbstractRepositoryAdapter";
import { User } from "../../domain/entities/User";

export class UserRepositoryAdapter extends AbstractRepositoryAdapter {
    constructor(userOrmRepository: Repository<User>) {
        super(userOrmRepository, User);
    }
}
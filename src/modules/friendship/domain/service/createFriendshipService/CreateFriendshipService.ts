import AppError from "../../../../../shared/errors/AppError";
import { IUserRepository } from "../../../../user/domain/repositories/IUserRepository";
import { Friendship } from "../../entities/Friendship";
import { IFriendshipRepository } from "../../repositories/IFriendshipRepository";
import { ICreateFriendshipServiceDTO } from "./ICreateFriendshipServiceDTO";

export class CreateFriendshipService {
    constructor(private _friendshipRepository: IFriendshipRepository, private _userRepository: IUserRepository) { }

    public async execute(data: ICreateFriendshipServiceDTO): Promise<Friendship> {
        if (data.userId === data.friendId) throw new AppError('users id is a same!')

        const user = await this._userRepository.findById(data.userId);
        const friend = await this._userRepository.findById(data.friendId);

        if (!user || !friend) throw new AppError(`user ${user || friend} not found!`);

        const friendship = new Friendship({
            user_id: data.userId,
            friend_id: data.friendId,
            requestIsAccept: false
        });

        try {
            await this._friendshipRepository.save(friendship);
        } catch (err) {
            throw new AppError('friendship is requested!');
        }

        friendship.user = user;
        return friendship
    }
}
import AppError from "../../../../../shared/errors/AppError";
import { IFriendshipRepository } from "../../repositories/IFriendshipRepository";

export class DenyFriendshipRequestService {
    constructor(private _friendshipRepository: IFriendshipRepository) { }

    public async execute(friendshipId: string): Promise<void> {
        const friendship = await this._friendshipRepository.findById(friendshipId);

        if (!friendship) throw new AppError('friendship not found!');

        await this._friendshipRepository.remove(friendship);
    }
}
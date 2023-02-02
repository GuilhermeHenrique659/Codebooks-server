import AppError from "../../../../../shared/errors/AppError";
import { IFriendshipRepository } from "../../repositories/IFriendshipRepository";

export class AcceptFriendshipRequestService {
    constructor(private _friendshipRepository: IFriendshipRepository) { }

    public async execute(friendshipId: string): Promise<void> {
        const friendship = await this._friendshipRepository.findById(friendshipId);

        if (!friendship) throw new AppError('request dont exists');

        friendship.requestIsAccept = true;

        await this._friendshipRepository.save(friendship);
    }
}
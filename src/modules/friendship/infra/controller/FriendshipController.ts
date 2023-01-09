import { ControllerInput } from "../../../../shared/adapter/ControllerBoundary";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { ISubject } from "../../../../shared/observer/ISubject";
import { CreateFriendshipRequestNotificationService } from "../../../notification/domain/service/CreateFriendshipRequestNotification/CreateFriendshipRequestNotificationService";
import { FriendshipRequestObserver } from "../../../notification/infra/observer/FriendshipRequestObserver";
import { Friendship } from "../../domain/entities/Friendship";
import { FriendshipServiceFactory } from "../../domain/service/FriendshipServiceFactory";
import { ICreateFriendshipServiceDTO } from "../../domain/service/createFriendshipService/ICreateFriendshipServiceDTO";

export class FriendshipController extends AbstractController {
    constructor(private friendshipService: FriendshipServiceFactory,
        private _notificationEvent: ISubject) {
        super()
    }

    public async createFriendshipHandle(request: ControllerInput<Omit<ICreateFriendshipServiceDTO, 'userId'>>): Promise<Friendship> {
        const userId = request.user?.id as string;
        const { friendId } = request.data

        this._notificationEvent.add(new FriendshipRequestObserver());

        const friendship = await this.friendshipService.getCreateFriendship().execute({ userId, friendId })
        this._notificationEvent.notify({
            friendId: friendship.friend_id,
            friendshipId: friendship.id,
            username: friendship.user.name
        });

        return friendship
    }
}
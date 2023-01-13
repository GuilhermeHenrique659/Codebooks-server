import { ControllerInput } from "../../../../shared/adapter/ControllerBoundary";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { ISubject } from "../../../../shared/observer/ISubject";
import { CreateFriendshipRequestNotificationService } from "../../../notification/domain/service/CreateFriendshipRequestNotification/CreateFriendshipRequestNotificationService";
import { DeleteNotificationObserver } from "../../../notification/infra/observer/DeleteNotificationObserver";
import { FriendshipRequestObserver } from "../../../notification/infra/observer/FriendshipRequestObserver";
import { Friendship } from "../../domain/entities/Friendship";
import { FriendshipServiceFactory } from "../../domain/service/FriendshipServiceFactory";
import { ICreateFriendshipServiceDTO } from "../../domain/service/createFriendshipService/ICreateFriendshipServiceDTO";
import { FriendshipPresentation } from "../presentation/FriendshipPresentation";

export class FriendshipController extends AbstractController {
    constructor(private friendshipService: FriendshipServiceFactory,
        private _notificationEvent: ISubject) {
        super()
    }

    public async acceptOrDenyFriendshipHandle(request: ControllerInput<IFriendshipHandleRequest>): Promise<boolean> {
        const { friendshipId, notificationId, requestIsAccept } = request.data
        this._notificationEvent.add(new DeleteNotificationObserver());

        if (requestIsAccept)
            await this.friendshipService.getAcceptFriendship().execute(friendshipId);
        else
            await this.friendshipService.getDenyFriendship().execute(friendshipId);

        this._notificationEvent.notify({
            notificationId: notificationId
        });
        return true;
    }

    public async listFriendshipHandle(request: ControllerInput): Promise<any> {
        const userId = request.user?.id as string;

        const friends = await this.friendshipService.getListFriendship().execute(userId);

        return FriendshipPresentation.listFriendshipt(friends);
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
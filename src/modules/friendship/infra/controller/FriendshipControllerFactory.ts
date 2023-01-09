import { NotificationSubject } from "../../../notification/infra/observer/NotificationSubject";
import { UserRepository } from "../../../user/domain/repositories/UserRepository";
import { userDataSource } from "../../../user/infra/database/UserSchemaDataSource";
import { FriendshipRepository } from "../../domain/repositories/FriendshipRepository";
import { FriendshipServiceFactory } from "../../domain/service/FriendshipServiceFactory";
import { friendshipDataSource } from "../database/FriendshipDataSource";
import { FriendshipController } from "./FriendshipController";

export function FriendshipControllerFactory() {
    const userRepository = new UserRepository(userDataSource);
    const friendshipRepository = new FriendshipRepository(friendshipDataSource);
    const friendshipServiceFactory = new FriendshipServiceFactory(userRepository, friendshipRepository)
    const notificationEvent = new NotificationSubject();
    return new FriendshipController(friendshipServiceFactory, notificationEvent);
}
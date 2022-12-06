import { PostRepository } from "../../../post/domain/repositories/PostRepository";
import { likeDataSource } from "../../../post/infra/database/LikeSchemaDataSource";
import { postDataSource } from "../../../post/infra/database/PostSchemaDataSource";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NotificationServiceFactory } from "../../domain/service/NoticationServiceFactory";
import { notificationDataSource } from "../database/NotificationSchemaDataSource";
import { NotificationController } from "./NotificationController";

export const NotificationControllerFactory = (): NotificationController => {
    const postRepository = new PostRepository(postDataSource, likeDataSource);
    const notificationRepository = new NotificationRepository(notificationDataSource);
    const notificationService = new NotificationServiceFactory(postRepository, notificationRepository);
    return new NotificationController(notificationService)
}
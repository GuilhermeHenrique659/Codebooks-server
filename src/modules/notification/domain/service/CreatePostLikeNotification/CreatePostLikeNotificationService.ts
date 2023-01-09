import AppError from "../../../../../shared/errors/AppError";
import { IPostRepository } from "../../../../post/domain/repositories/IPostRepostirory";
import { Notification } from "../../entities/Notification";
import NotificationType from "../../entities/NotificationType";
import { INotificationRepository } from "../../repositories/INotificationRepository";
import { ICreatePostLikeNotificationDTO } from "./CreatePostLikeNotificationDTO";

export class CreatePostLikeNotificationService {
    constructor(private notificationRepository: INotificationRepository,
        private postRepository: IPostRepository) { }

    public async execute({ postId }: ICreatePostLikeNotificationDTO) {
        const post = await this.postRepository.findById(postId, false);

        if (!post) throw new AppError('post not found');

        const notification = new Notification({
            message: 'somebody liked one of your post',
            link: postId,
            type: NotificationType.POSTLIKE,
            user_id: post.user_id,
        });

        return this.notificationRepository.save(notification);
    }
}
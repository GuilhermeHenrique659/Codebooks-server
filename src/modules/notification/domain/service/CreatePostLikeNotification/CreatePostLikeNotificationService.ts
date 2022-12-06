import AppError from "../../../../../shared/errors/AppError";
import { IPostRepository } from "../../../../post/domain/repositories/IPostRepostirory";
import { Notification } from "../../entities/Notification";
import { INotificationRepository } from "../../repositories/INotificationRepository";
import { ICreatePostLikeNotificationDTO } from "./CreatePostLikeNotificationDTO";

export class CreatePostLikeNotificationService {
    constructor(private notificationRepository: INotificationRepository,
        private postRepository: IPostRepository) { }

    public async execute({ postId }: ICreatePostLikeNotificationDTO) {
        const post = await this.postRepository.findById(postId);

        if (!post) throw new AppError('post not found');

        const notification = new Notification({
            message: 'somebody liked one of your post',
            link: postId,
            user_id: post.user_id,
        });

        return this.notificationRepository.save(notification);
    }
}
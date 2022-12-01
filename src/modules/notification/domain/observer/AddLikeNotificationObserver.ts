import { app } from "../../../../shared/infra/http";
import { IObserver } from "../../../../shared/observer/IObserver";
import { postDataSource } from "../../../post/infra/database/PostSchemaDataSource";

export class AddLikeNotificationObserver implements IObserver {
    async update(postId: string) {
        const post = await postDataSource.findOne({
            where: {
                id: postId
            }
        })
        if (post)
            app.getListener().sendEvents(post.user_id, 'notification', 'like in on of your posts')
    }
}
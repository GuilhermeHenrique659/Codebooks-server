import { ControllerInput, ControllerOutput } from "../../../../shared/adapter/ControllerBoundary";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { AddLikeNotificationObserver } from "../../../notification/infra/observer/AddLikeNotificationObserver";
import { NotificationObserver } from "../../../notification/infra/observer/NotificationSubject";
import { Post } from "../../domain/entities/Post";
import { ICreatePostServiceDTO } from "../../domain/services/CreatePostService/CreatePostServiceDTO";
import { PostServiceFactory } from "../../domain/services/PostServiceFactory";
import { PostPresentation } from "../presentation/PostPresentation";
import { IPostListOutput } from "./controllerOutput/IPostListOutput";

export class PostController extends AbstractController {
    constructor(private _postServiceFactory: PostServiceFactory) {
        super()
    }
    public async createPostHandle(request: ControllerInput<Omit<ICreatePostServiceDTO, 'user_id' | 'like'>>): Promise<ControllerOutput<Post>> {
        const { title, description } = request.data;
        const id = request.user?.id;

        const post = await this._postServiceFactory.getCreatePostService().execute({
            title,
            description,
            like: 0,
            user_id: id as string
        });

        return {
            data: post
        };
    }

    public async addLikeHandle(request: ControllerInput): Promise<ControllerOutput<{ likeIsAdd: boolean }>> {
        const { postId } = request.data;
        const id = request.user?.id;

        const event = new NotificationObserver();
        event.add(new AddLikeNotificationObserver());

        await this._postServiceFactory.getAddLikeService().execute(id as string, postId);

        await event.notify(postId)
        return {
            data: {
                likeIsAdd: true
            }
        }
    }

    public async ListPostHandle(request: ControllerInput): Promise<ControllerOutput<IPostListOutput>> {
        const page = request.data.page ? Number(request.data.page) : 1;
        const limit = request.data.limit ? Number(request.data.limit) : 3;
        const userId = request.data.userId


        const posts = await this._postServiceFactory.getListPostSerive().execute({
            page,
            limit,
            userId
        });

        return {
            data: PostPresentation.getPostList(posts)
        }
    }

}
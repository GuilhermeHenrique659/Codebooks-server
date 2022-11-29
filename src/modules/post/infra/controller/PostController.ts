import { ControllerInput, ControllerOutput } from "../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { AddLikeNotificationObserver } from "../../../notification/domain/observer/AddLikeNotificationObserver";
import { NotificationObserver } from "../../../notification/domain/observer/NotificationSubject";
import { ICreateUserServiceDTO } from "../../../user/domain/services/createUserServices/CreateUserServiceDTO";
import { PostServiceFactory } from "../../domain/services/PostServiceFactory";
import { PostPresentation } from "../presentation/PostPresentation";
import { IPostListOutput } from "./controllerOutput/IPostListOutput";
import { PostOutput } from "./controllerOutput/PostOutput";

export class PostController extends AbstractController {
    constructor(private _postServiceFactory: PostServiceFactory) {
        super()
    }
    public async createPostHandle(request: ControllerInput<Omit<ICreateUserServiceDTO, 'user_id'>>): Promise<ControllerOutput<PostOutput>> {
        const { title, description } = request.data;
        const { id } = request.user;

        const post = await this._postServiceFactory.getCreatePostService().execute({
            title,
            description,
            like: 0,
            user_id: id as string
        });

        return {
            data: PostPresentation.getPost(post)
        };
    }

    public async addLikeHandle(request: ControllerInput): Promise<ControllerOutput<{ likeIsAdd: boolean }>> {
        const { postId } = request.data;
        const { id } = request.user;

        const event = new NotificationObserver();
        event.add(new AddLikeNotificationObserver());

        await this._postServiceFactory.getAddLikeService().execute(id as string, postId);

        event.notify(postId)
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
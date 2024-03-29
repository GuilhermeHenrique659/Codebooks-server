import { ControllerInput } from "../../../../shared/adapter/ControllerBoundary";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { ISubject } from "../../../../shared/observer/ISubject";
import { Files } from "../../../files/domain/entities/File";
import { FilesServiceFactory } from "../../../files/domain/service/FilesServiceFactory";
import { AddLikeNotificationObserver } from "../../../notification/infra/observer/AddLikeNotificationObserver";
import { Post } from "../../domain/entities/Post";
import { ICreatePostServiceDTO } from "../../domain/services/CreatePostService/CreatePostServiceDTO";
import { PostServiceFactory } from "../../domain/services/PostServiceFactory";
import { IShowPostServiceDTO } from "../../domain/services/ShowPostService/IShowPostServiceDTO";
import { PostPresentation } from "../presentation/PostPresentation";
import { IPostListOutput } from "./controllerOutput/IPostListOutput";

export class PostController extends AbstractController {
    constructor(
        private _postServiceFactory: PostServiceFactory,
        private _fileServiceFactory: FilesServiceFactory,
        private _notificationEvent: ISubject,
    ) {
        super();
    }
    public async createPostHandle(request: ControllerInput<Omit<ICreatePostServiceDTO, "user_id" | "like">>): Promise<Post> {
        const { title, description } = request.data;
        const files = request.files;
        const id = request.user?.id;

        const post = await this._postServiceFactory.getCreatePostService().execute({
            title,
            description,
            like: 0,
            user_id: id as string,
        });

        if (files) {
            post.files = await this._fileServiceFactory.getCreateFileService().execute(post.id, files);
        }

        return post;
    }

    public async showPostHandle(request: ControllerInput<IShowPostServiceDTO>) {
        const post = await this._postServiceFactory.getShowPostService().execute(request.data);

        return PostPresentation.getPost(post);
    }

    public async addLikeHandle(request: ControllerInput): Promise<{ likeIsAdd: boolean }> {
        const { postId } = request.data;
        const id = request.user?.id;

        this._notificationEvent.add(new AddLikeNotificationObserver());

        await this._postServiceFactory.getAddLikeService().execute(id as string, postId);

        await this._notificationEvent.notify(postId);
        return {
            likeIsAdd: true,
        };
    }

    public async ListPostHandle(request: ControllerInput): Promise<IPostListOutput> {
        const page = request.data.page ? Number(request.data.page) : 1;
        const limit = request.data.limit ? Number(request.data.limit) : 3;
        const userId = request.data.userId;

        const posts = await this._postServiceFactory.getListPostSerive().execute({
            page,
            limit,
            userId,
        });
        return PostPresentation.getPostList(posts);
    }
}

import { IHttpRequest, IHttpResponse } from "../../../../shared/adapter/HttpAdabter";
import { AbstractController } from "../../../../shared/controller/AbstractController";
import { PostServiceFactory } from "../../domain/services/PostServiceFactory";

export class PostController extends AbstractController {
    constructor(private _postServiceFactory: PostServiceFactory) {
        super()
    }
    public async createPostHandle(request: IHttpRequest): Promise<IHttpResponse> {
        const { title, description } = request.body;
        const { id } = request.user;

        const post = await this._postServiceFactory.getCreatePostService().execute({
            title: title,
            description: description,
            like: 0,
            user_id: id as string
        });

        return {
            body: post
        };
    }

    public async ListPostHandle(request: IHttpRequest): Promise<IHttpResponse> {
        const posts = await this._postServiceFactory.getListPostSerive().execute();

        return {
            body: posts
        }
    }

}
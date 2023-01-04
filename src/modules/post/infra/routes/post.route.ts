import { AbstractRoute } from "../../../../shared/infra/routes/AbstractRoute";
import { HttpMethod, IRouteMethod } from "../../../../shared/infra/routes/IRoutesMethod";
import { PostValidation } from "../../validation/PostValidation";
import { PostController } from "../controller/PostController";
import { PostControllerFactory } from "../controller/PostControllerFactory";


class PostRoute extends AbstractRoute<PostController, PostValidation> {
    protected RouteMethods: IRouteMethod<PostController, PostValidation> = {
        prefix: 'post',
        routesConfig: [
            {
                method: HttpMethod.POST,
                url: '/',
                controller: 'createPostHandle',
                authentication: true,
                validation: 'createPostValidate'
            },
            {
                method: HttpMethod.GET,
                url: '/',
                controller: 'ListPostHandle',
                validation: 'listPostValidate',
                authentication: true
            },
            {
                method: HttpMethod.PATCH,
                url: '/addLike',
                controller: 'addLikeHandle',
                authentication: true
            },
            {
                method: HttpMethod.GET,
                url: '/:postId',
                controller: 'showPostHandle',
                authentication: true,
                validation: 'showPostValidate'
            }
        ]
    }

    constructor(postController: PostController) {
        super(postController, PostValidation)
    }
}

export const postRoute = new PostRoute(PostControllerFactory());
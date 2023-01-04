import { IAbstractServiceFactory } from "../../../../shared/services/IAbstractServiceFactory";
import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { IPostRepository } from "../repositories/IPostRepostirory";
import { AddLikePostService } from "./AddLikePostService/AddLikePostService";
import { CreatePostService } from "./CreatePostService/CreatePostService";
import { ListPostService } from "./ListPostService/ListPostService";
import { ShowPostService } from "./ShowPostService/ShowPostService";

export class PostServiceFactory implements IAbstractServiceFactory {
    constructor(private _postRepository: IPostRepository,
        private _userRespository: IUserRepository) { }

    public getCreatePostService(): CreatePostService {
        return new CreatePostService(this._postRepository, this._userRespository);
    }

    public getListPostSerive(): ListPostService {
        return new ListPostService(this._postRepository);
    }

    public getAddLikeService(): AddLikePostService {
        return new AddLikePostService(this._postRepository);
    }

    public getShowPostService(): ShowPostService {
        return new ShowPostService(this._postRepository);
    }
}
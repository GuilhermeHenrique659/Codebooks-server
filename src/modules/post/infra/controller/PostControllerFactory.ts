import { UserRepository } from "../../../user/domain/repositories/UserRepository";
import { userDataSource } from "../../../user/infra/database/UserSchemaDataSource";
import { PostRepository } from "../../domain/repositories/PostRepository";
import { PostServiceFactory } from "../../domain/services/PostServiceFactory";
import { likeDataSource } from "../database/LikeSchemaDataSource";
import { postDataSource } from "../database/PostSchemaDataSource";
import { PostController } from "./PostController";

export const PostControllerFactory = (): PostController => {
    const postRepository = new PostRepository(postDataSource, likeDataSource);
    const userRepository = new UserRepository(userDataSource);
    const postServiceFactory = new PostServiceFactory(postRepository, userRepository)
    return new PostController(postServiceFactory);
}
import { LocalFilesProvider } from "../../../../shared/providers/LocalFilesProviders";
import { FilesRepository } from "../../../files/domain/repositories/FilesRepository";
import { FilesServiceFactory } from "../../../files/domain/service/FilesServiceFactory";
import { filesDataSource } from "../../../files/infra/database/FilesSchemaDataSource";
import { NotificationSubject } from "../../../notification/infra/observer/NotificationSubject";
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
    const postServiceFactory = new PostServiceFactory(postRepository, userRepository);
    const filesProvider = new LocalFilesProvider();
    const filesRepository = new FilesRepository(filesDataSource);
    const filesServiceFactory = new FilesServiceFactory(filesRepository, filesProvider);
    return new PostController(postServiceFactory, filesServiceFactory, new NotificationSubject());
};

import { LocalFilesProvider } from "../../../../../shared/providers/LocalFilesProviders";
import { MockHashProvider } from "../../../domain/providers/MockHashProvider";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserServiceFactory } from "../../../domain/services/UserServiceFactory";
import { userDataSource } from "../../database/UserSchemaDataSource";
import { UserController } from "./UserController";

export const UserControllerFactory = (): UserController => {
    const userRepository = new UserRepository(userDataSource)
    const hashProvider = new MockHashProvider();
    const localFileProvider = new LocalFilesProvider();
    const userFactory = new UserServiceFactory(userRepository, hashProvider, localFileProvider);
    return new UserController(userFactory);
}
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserService } from "../../../domain/services/createUserServices/CreateUserService";
import { userDataSource } from "../../database/UserSchemaDataSource";
import { UserController } from "./UserController";

export const UserControllerFactory = (): UserController => {
    const userRepository = new UserRepository(userDataSource)
    const createUserService = new CreateUserService(userRepository);
    return new UserController(createUserService);
}
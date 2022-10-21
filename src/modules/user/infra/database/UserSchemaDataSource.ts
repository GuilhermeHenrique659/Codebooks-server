import { connection } from "../../../../shared/infra/database";
import { User } from "../../domain/entities/User";
import { userEntitySchema } from "./entities/UserSchema";
import { UserRepositoryAdapter } from "./UserRepositoryAdapter";


export const userDataSource = new UserRepositoryAdapter(connection.getRepository<User>(userEntitySchema));
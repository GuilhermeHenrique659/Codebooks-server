import { connection } from "../../../../shared/infra/database";
import { User } from "../../domain/entities/User";
import { userEntitySchema } from "./entities/UserSchema";


export const userDataSource = connection.getRepository<User>(userEntitySchema);
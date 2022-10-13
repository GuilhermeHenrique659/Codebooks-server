import { User } from "../entities/User";

export interface IUserRepository {
    store(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
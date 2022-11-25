import { User } from "../../../domain/entities/User";

export class UserPresentation {
    static getUserResponse(user: User): Omit<User, 'password' | keyof User> {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
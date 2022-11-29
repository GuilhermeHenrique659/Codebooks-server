import { User } from "../../../domain/entities/User";

export class UserPresentation {
    static getUserResponse(user: User) {
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar
        }
    }
}
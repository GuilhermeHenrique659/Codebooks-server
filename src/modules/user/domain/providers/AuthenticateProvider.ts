import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import authConfig from './../../../../config/auth';


export class AuthenticateProvider {
    static sing(user: User) {
        return sign({
            "name": user.name,
        }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });
    }
}
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import AppError from "../errors/AppError";
import authConfig from './../../config/auth';


interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string
}
export class AuthenticateMiddleware {
    static isAutheticated = (authenticated?: boolean) => (request: Request, response: Response, next: NextFunction) => {
        if (!authenticated)
            return next();

        const authHeader = request.headers.authorization;

        const sub = this.AuthenticatedToken(authHeader);

        request.user = {
            id: sub,
        }

        return next();

    }

    static AuthenticatedToken(authHeader?: string) {
        if (!authHeader) {
            throw new AppError("token is missing.")
        }

        const [, token] = authHeader.split(" ");

        try {
            const decodedToken = verify(token, authConfig.jwt.secret);

            const { sub } = decodedToken as ITokenPayload;

            return sub;
        } catch {
            throw new AppError("Token JWT is not valid")
        }
    }
}
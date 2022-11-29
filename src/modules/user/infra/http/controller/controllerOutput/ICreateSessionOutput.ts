import { IGetUserOutput } from "./IGetUserOutput";

export interface ICreateSessionResponse {
    token: string;
    userExits: IGetUserOutput;
}
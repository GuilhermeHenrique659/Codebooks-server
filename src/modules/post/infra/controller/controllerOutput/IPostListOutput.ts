import { IGetUserOutput } from "../../../../user/infra/http/controller/controllerOutput/IGetUserOutput";
import { Post } from "../../../domain/entities/Post";
import { PostOutput } from "./PostOutput";



export interface IPostListOutput {
    total: number;
    current_page: number;
    data: Array<PostOutput>
}
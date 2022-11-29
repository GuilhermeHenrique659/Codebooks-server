import { IGetUserOutput } from "../../../../user/infra/http/controller/controllerOutput/IGetUserOutput"
import { Post } from "../../../domain/entities/Post"


export type PostOutput = Omit<Post, 'user' | keyof Post> & { user: IGetUserOutput }
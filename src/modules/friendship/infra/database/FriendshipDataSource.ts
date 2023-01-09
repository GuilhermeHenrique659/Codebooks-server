import db from "../../../../shared/infra/database";
import { Friendship } from "../../domain/entities/Friendship";
import { FriendshipRepositoryAdapter } from "./FriendshipRepositoryAdapter";
import { FriendshipEntitySchema } from "./entities/FriendshipEntity";

export const friendshipDataSource = db.getDataSource<Friendship>(FriendshipEntitySchema, FriendshipRepositoryAdapter);
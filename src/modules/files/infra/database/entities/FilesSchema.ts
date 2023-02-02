import { EntitySchema } from "typeorm";
import { Files } from "../../../domain/entities/File";

export const FilesSchema = new EntitySchema<Files>({
    name: "files",
    columns: {
        id: {
            type: "uuid",
            primary: true,
        },
        filename: {
            type: String,
        },
        postId: {
            type: "uuid",
        },
    },
    relations: {
        post: {
            type: "many-to-one",
            target: "posts",
            cascade: true,
            joinColumn: {
                name: "postId",
                referencedColumnName: "id",
            },
            inverseSide: "files",
        },
    },
});

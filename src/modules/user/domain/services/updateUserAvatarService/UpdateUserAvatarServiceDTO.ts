import { File } from "../../../../../shared/types/Files";


export interface IUpdateUserAvatarServiceDTO {
    user_id: string;
    avatar: File[];
}

export interface IUpdateUserServiceDTO {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    passwordToConfirm: string;
}
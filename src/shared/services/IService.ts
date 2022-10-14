

export interface IService {
    execute(...any: any): Promise<any>;
}
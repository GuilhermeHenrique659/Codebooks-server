export interface IRepositoryAdapter<T> {
    save(entities: T, option?: any): Promise<T>;
    find(option?: any | undefined): Promise<T[]>;
    findOne(option?: any | undefined): Promise<T | null>;
    remove(entities: T, option?: any | undefined): Promise<void>
    count(): Promise<number>
}



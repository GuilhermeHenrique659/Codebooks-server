export interface IRepositoryAdapter<T> {
    save(entity: T, option?: any): Promise<T>;
    insert(entity: T): Promise<T>;
    find(option?: any | undefined): Promise<T[]>;
    findOne(option?: any | undefined): Promise<T | null>;
    remove(entity: T, option?: any | undefined): Promise<void>
    count(): Promise<number>
}



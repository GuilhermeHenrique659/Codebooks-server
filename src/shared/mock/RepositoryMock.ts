import { IEntity } from "../adapter/IEntity";
import { IRepositoryAdapter } from "../adapter/IRepositoryAdapter";



interface Ioption {
    where: Record<string, unknown>
}

export class MockRepository<T> implements IRepositoryAdapter<T>{
    public db: T[] = [];

    public async findOne(option: Ioption): Promise<T | null> {
        const where = Object.keys(option.where)
        const property = Object.values(option.where)

        if (where.length > 1) {
            const operator = (): string => {
                const query = `item.${where[0]} === "${property[0]}" && `
                const queryArray = []
                for (let i = 1; i < where.length - 1; i++) {
                    queryArray.push(`item.${where[i]} === "${property[i]}" && `)
                }

                queryArray.push(`item.${where[where.length - 1]} === "${property[where.length - 1]}" `)
                return query.concat(...queryArray)
            }

            const [res] = this.db.filter((item) => eval(operator()))
            if (res === undefined) return null
            return res
        } else {
            const [res] = this.db.filter((item) => eval(`item.${where[0]} === "${property[0]}"`))
            if (res === undefined) return null
            return res
        }
    }

    public async find(option?: any): Promise<T[]> {
        const where = Object.keys(option.where)
        const property = Object.values(option.where)

        if (where.length > 1) {
            const operator = (): string => {
                const query = `item.${where[0]} === "${property[0]}" && `
                const queryArray = []
                for (let i = 1; i < where.length - 1; i++) {
                    queryArray.push(`item.${where[i]} === "${property[i]}" && `)
                }

                queryArray.push(`item.${where[where.length - 1]} === "${property[where.length - 1]}" `)
                return query.concat(...queryArray)
            }

            return this.db.filter((item) => eval(operator()))
        } else {
            return this.db.filter((item) => eval(`item.${where[0]} === "${property[0]}"`))
        }
    }

    public async save(entities: T, option?: any): Promise<T> {
        this.db.push(entities)
        return entities
    }

    public async insert(entity: T): Promise<T> {
        this.db.push(entity);
        return entity
    }

    public async remove(entities: T, option?: any): Promise<void> {
        const findIndex = this.db.findIndex(entity => entity === entities);

        this.db.splice(findIndex, 1);
    }

    public async count(): Promise<number> {
        return this.db.length;
    }

}
import { Repository } from "typeorm";
import { IEntity } from "./IEntity";
import { IRepositoryAdapter } from "./IRepositoryAdapter";

export abstract class AbstractRepositoryAdapter implements IRepositoryAdapter<IEntity> {
    constructor(private _typeormRepository: Repository<IEntity>, private Entity: new (props: any, id?: string) => IEntity) { }

    public async findOne(option?: any): Promise<IEntity | null> {
        const dataBaseEntity = await this._typeormRepository.findOne(option);
        if (dataBaseEntity) return new this.Entity(dataBaseEntity, dataBaseEntity.id)
        return null
    }

    public async find(option?: any): Promise<IEntity[]> {
        const dataBaseEntites = await this._typeormRepository.find(option);
        return dataBaseEntites.flatMap((entity) => {
            return new this.Entity(entity, entity.id);
        })
    }

    public async save(entity: IEntity, option?: any): Promise<IEntity> {
        await this._typeormRepository.save(entity, option);
        return entity;
    }

    public async insert(entity: IEntity): Promise<IEntity> {
        await this._typeormRepository.insert(entity);
        return entity
    }

    public async remove(entity: IEntity, option?: any): Promise<void> {
        await this._typeormRepository.remove(entity, option);
    }

    public async count(): Promise<number> {
        return this._typeormRepository.count();
    }
}
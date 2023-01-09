import { v4 as uuidv4 } from 'uuid';
import { IEntity } from "../../../../shared/adapter/IEntity";


export class Notification implements IEntity {
    public id: string;

    public message: string;

    public link: string;

    public type: string

    public user_id: string

    constructor(props: Omit<Notification, 'id' | keyof Notification>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
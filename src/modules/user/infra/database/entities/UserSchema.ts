

import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/entities/User';


export const userEntitySchema = new EntitySchema<User>({
    name: 'users',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
    }
});
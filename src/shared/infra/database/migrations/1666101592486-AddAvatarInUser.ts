import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddAvatarInUser1666101592486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar')
    }

}

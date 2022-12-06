import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddUserToNotification1669988529548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'notification',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'notification',
            new TableForeignKey({
                name: 'notificationUser',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('notification', 'notificationUser');
        await queryRunner.dropColumn('notification', 'user_id');
    }

}

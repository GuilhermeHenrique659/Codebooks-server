import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm"

export class CreateFriendship1673021678722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'friendship',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'friend_id',
                    type: 'uuid',
                },
                {
                    name: 'requestIsAccept',
                    type: 'bool'
                }
            ]
        }));

        await queryRunner.createUniqueConstraint('friendship', new TableUnique({
            name: 'UK_userId_friendId',
            columnNames: [
                'user_id',
                'friend_id',
            ]
        }));

        await queryRunner.createForeignKey(
            'friendship',
            new TableForeignKey({
                name: 'friendshipUserId',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }));

        await queryRunner.createForeignKey(
            'friendship',
            new TableForeignKey({
                name: 'friendshipFriendId',
                columnNames: ['friend_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('friendship', 'friendshipFriendId');
        await queryRunner.dropForeignKey('friendship', 'friendshipUserId');
        await queryRunner.dropUniqueConstraint('friendship', 'UK_userId_friendId');
        await queryRunner.dropTable('friendship')
    }

}

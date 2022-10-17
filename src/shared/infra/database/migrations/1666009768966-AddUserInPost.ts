import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddUserInPost1666009768966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'posts',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true
            })
        );
        await queryRunner.createForeignKey(
            'posts',
            new TableForeignKey({
                name: 'postsUser',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('posts', 'postsUser');
        await queryRunner.dropColumn('posts', 'user_id');
    }

}

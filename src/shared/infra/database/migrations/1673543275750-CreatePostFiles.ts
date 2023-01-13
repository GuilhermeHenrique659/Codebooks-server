import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePostFiles1673543275750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'files',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'filename',
                    type: 'varchar',
                },
                {
                    name: 'postId',
                    type: 'uuid',
                },
            ]
        }));

        await queryRunner.createForeignKey('files', new TableForeignKey({
            name: 'post_files',
            columnNames: ['postId'],
            referencedTableName: 'posts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('files', 'post_files');
        await queryRunner.dropTable('files');
    }

}

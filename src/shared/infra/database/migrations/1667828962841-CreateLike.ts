import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm"

export class CreateLike1667828962841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_like_post',
            columns: [
                {
                    name: 'user_id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'post_id',
                    type: 'uuid',
                    isPrimary: true
                }
            ],
        }));

        await queryRunner.createForeignKey(
            'user_like_post',
            new TableForeignKey({
                name: 'userLike',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );

        await queryRunner.createForeignKey(
            'user_like_post',
            new TableForeignKey({
                name: 'postLike',
                columnNames: ['post_id'],
                referencedTableName: 'posts',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_like_posts', 'postLike');
        await queryRunner.dropForeignKey('user_like_posts', 'userLike');
        await queryRunner.dropTable('user_like_post');
    }

}

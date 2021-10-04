import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsAndTagsRelation1629503913508
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_tags_tags',
        columns: [
          {
            name: 'productsId',
            type: 'uuid',
          },
          {
            name: 'tagsTitle',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['productsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
          },
          {
            columnNames: ['tagsTitle'],
            referencedColumnNames: ['title'],
            referencedTableName: 'tags',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_tags_tags');
  }
}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProduct1629503022435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'float',
          },
          {
            name: 'inventory',
            type: 'integer',
          },
          {
            name: 'created_by',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'ProductCreator',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'ProductCreator');
    await queryRunner.dropTable('products');
  }
}

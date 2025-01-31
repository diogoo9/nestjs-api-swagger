import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FarmCrops1736706924435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farm_crops',
        columns: [
          {
            name: 'farm_id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'crops_id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farms',
          },
          {
            columnNames: ['crops_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'crops',
          },
        ],
      }),
    );

    await queryRunner.query(`
        ALTER TABLE farm_crops
        ADD CONSTRAINT UNIQUECOLUMNSID UNIQUE(farm_id, crops_id);
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farm_crops');
  }
}

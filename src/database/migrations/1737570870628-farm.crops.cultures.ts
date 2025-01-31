import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FarmCropsCultures1737570870628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farm_crops_cultures',
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
            name: 'culture_id',
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
            columnNames: ['farm_id', 'crops_id'],
            referencedColumnNames: ['farm_id', 'crops_id'],
            referencedTableName: 'farm_crops',
          },
          {
            columnNames: ['culture_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cultures',
          },
        ],
      }),
    );

    await queryRunner.query(`
        ALTER TABLE farm_crops_cultures
        ADD CONSTRAINT UNIQUECOLUMNSIDS UNIQUE(farm_id, crops_id, culture_id);
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farm_crops_cultures');
  }
}

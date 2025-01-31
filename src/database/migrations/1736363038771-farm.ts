import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Farm1736363038771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farms',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'producer_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city_id',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'area_total',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'area_arable',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'area_vegetation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            onUpdate: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['producer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'producers',
          },
          {
            columnNames: ['city_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cities',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farms');
  }
}

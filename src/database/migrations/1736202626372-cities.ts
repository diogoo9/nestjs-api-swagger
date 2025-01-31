import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Cities1736202626372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'numeric',
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
            name: 'state_id',
            type: 'numeric',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['state_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'states',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cities');
  }
}

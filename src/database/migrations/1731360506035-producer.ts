import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1731360506035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'producers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'doc_number',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('producers');
  }
}

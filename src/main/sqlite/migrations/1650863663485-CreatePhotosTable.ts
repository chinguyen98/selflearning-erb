import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePhotosTable1650863663485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS photos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

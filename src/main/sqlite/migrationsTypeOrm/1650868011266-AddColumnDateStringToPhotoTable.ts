import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDateStringToPhotoTable1650868011266
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE "photos" ADD COLUMN "created_at" TEXT'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

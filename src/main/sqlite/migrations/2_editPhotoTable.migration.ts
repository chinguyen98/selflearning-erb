import { DataSource } from 'typeorm';

const version = 2;

const editPhotoTableMigration = async (
  currentVersion: number,
  connector: DataSource,
  updateVersionCallback: (version: number) => Promise<void>
) => {
  if (version > currentVersion) {
    const sql: string =
      'ALTER TABLE "photos" ADD date TEXT ';
    const data = await connector.query(sql);
    await updateVersionCallback(version);
    return data;
  }
};

export default editPhotoTableMigration;

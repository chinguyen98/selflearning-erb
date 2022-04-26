import { DataSource } from 'typeorm';

const version = 1;

const runCreatePhotoTableMigration = async (
  currentVersion: number,
  connector: DataSource,
  updateVersionCallback: (version: number) => Promise<void>
) => {
  if (version > currentVersion) {
    const sql: string =
      'CREATE TABLE IF NOT EXISTS photos ( id INTEGER PRIMARY KEY, name TEXT)';
    const data = await connector.query(sql);
    await updateVersionCallback(version);
    return data;
  }
};

export default runCreatePhotoTableMigration;

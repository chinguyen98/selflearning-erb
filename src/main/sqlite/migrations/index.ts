import { DataSource } from 'typeorm';
import runCreatePhotoTableMigration from './1_createPhotoTable.migration';
import editPhotoTableMigration from './2_editPhotoTable.migration';

type Migrations = {
  id: number;
  version: number;
};

class SqliteMigration {
  private connector: DataSource;

  constructor(_connector: DataSource) {
    this.connector = _connector;
  }

  async createMigrations() {
    await this.createTable();
    await this.insertVersion(0);
  }

  async runMigration() {
    const currentVersion = await this.checkVersion();

    await runCreatePhotoTableMigration(
      currentVersion,
      this.connector,
      async (version) => {
        this.updateVersion(version);
      }
    );

    await editPhotoTableMigration(
      currentVersion,
      this.connector,
      async (version) => {
        this.updateVersion(version);
      }
    );
  }

  // Checking migration version
  async checkVersion() {
    const data = await this.getVersion();
    return data.version;
  }

  async createTable() {
    const sql: string =
      'CREATE TABLE IF NOT EXISTS migrations (id	INTEGER, version	INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT));';

    const data = await this.connector?.query(sql);
  }

  async getMigrations() {
    return this.connector?.query('select * from migrations');
  }

  async insertVersion(ver: number) {
    const sql: string =
      'INSERT INTO "migrations" ("version") VALUES ("' + ver + '");';
    return this.connector?.query(sql);
  }

  async updateVersion(ver: number) {
    const sql: string =
      'UPDATE migrations SET version = ' + ver + ' where id = 1;';
    return this.connector?.query(sql);
  }

  async getVersion(): Promise<Migrations> {
    const sql: string = 'select * from migrations where id = 1;';
    const listVersion: Migrations[] = await this.connector?.query(sql);
    return listVersion[0];
  }
}

export default SqliteMigration;

import { app } from 'electron';
import path from 'path';
import { DataSource } from 'typeorm';
import Photo from './entity/Photo';
import sqlite3 from 'sqlite3';
const sql = sqlite3.verbose();

let db: any = null;

const sqliteDbPath: string = path.join(app.getPath('userData'), 'db2.sqlite');

export const SqliteDataSource = new DataSource({
  type: 'sqlite',
  database: sqliteDbPath,
  entities: [Photo],
  migrations: ['src/main/sqlite/migrations/*{.ts,.js}'],
  logging: true,
});

export const createSqliteConnection = async () => {
  try {
    console.log(`Check sqliteDbPath: ${sqliteDbPath}`);

    if (!db) {
      db = new sql.Database(sqliteDbPath);
    }

    await SqliteDataSource.initialize();
    await SqliteDataSource.runMigrations();

    /* Init successfully */
    console.log('Init sqlite successfully');
  } catch (error) {
    console.error('createSqliteConnection error', error);
  }
};

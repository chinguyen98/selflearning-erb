import { app } from 'electron';
import path from 'path';
import { DataSource } from 'typeorm';
import Photo from './entity/Photo';
import sqlite3 from 'sqlite3';
const sql = sqlite3.verbose();

let db: any = null;

const isDev = process.env.NODE_ENV === 'development';

const sqliteDbPath: string = path.join(
  app.getPath('userData'),
  `db${isDev ? 'Dev' : 'Prod'}.sqlite`
);

export const SqliteDataSource = new DataSource({
  type: 'sqlite',
  database: sqliteDbPath,
  entities: [Photo],
  migrations: [__dirname + '/migrations/**/*.ts'],
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

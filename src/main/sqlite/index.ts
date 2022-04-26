import { app } from 'electron';
import path from 'path';
import { DataSource } from 'typeorm';
import Photo from './entity/Photo';
import sqlite3 from 'sqlite3';

let db: sqlite3.Database | null = null;

const isDev = process.env.NODE_ENV === 'development';

const sqliteDbPath: string = path.join(
  app.getPath('userData'),
  `db${isDev ? 'Dev' : 'Prod'}.sqlite`
);

export const SqliteDataSource = new DataSource({
  type: 'sqlite',
  database: sqliteDbPath,
  entities: [Photo],
  // migrations: [
  //   app.isPackaged
  //     ? path.join(process.resourcesPath, '/migrations/**/*.js')
  //     : path.join(__dirname, '/migrations/**/*.ts'),
  // ],
  logging: true,
});

export const createSqliteConnection = async () => {
  try {
    console.log(`Check sqliteDbPath: ${sqliteDbPath}`);

    if (!db) {
      db = new sqlite3.Database(sqliteDbPath);
    }

    await SqliteDataSource.initialize();

    /* Init successfully */
    console.log('Init sqlite successfully');
  } catch (error) {
    console.error('createSqliteConnection error', error);
  }
};

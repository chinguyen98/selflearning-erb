import { app } from 'electron';
import path from 'path';
import { DataSource } from 'typeorm';
import Photo from './entity/Photo';
import sqlite3 from 'sqlite3';
import { CreatePhotosTable1650863663485 } from './migrations/1650863663485-CreatePhotosTable';
import { AddColumnDateStringToPhotoTable1650868011266 } from './migrations/1650868011266-AddColumnDateStringToPhotoTable';
const sql = sqlite3.verbose();

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
  // migrations: [isDev ? __dirname + '/migrations/**/*.ts' : './*Table.js'],
  // migrations: [
  //   CreatePhotosTable1650863663485,
  //   AddColumnDateStringToPhotoTable1650868011266,
  // ],
  migrations: [
    app.isPackaged
      ? path.join(process.resourcesPath, 'migrations/**/*.js')
      : path.join(__dirname, '/migrations/**/*.ts'),
  ],
  logging: true,
  migrationsRun: true,
});

export const createSqliteConnection = async () => {
  try {
    console.log(`Check sqliteDbPath: ${sqliteDbPath}`);

    if (!db) {
      db = new sql.Database(sqliteDbPath);
      // db.all(
      //   'CREATE TABLE IF NOT EXISTS photos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)'
      // );
    }

    await SqliteDataSource.initialize();

    /* Init successfully */
    console.log('Init sqlite successfully');
  } catch (error) {
    console.error('createSqliteConnection error', error);
  }
};

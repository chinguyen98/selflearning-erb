import { app } from 'electron';
import path from 'path';
import { DataSource } from 'typeorm';
import Photo from './entity/Photo';
import sqlite3 from 'sqlite3';
import SqliteMigration from './migrations';

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

    const migration = new SqliteMigration(SqliteDataSource);
    try {
      await migration.getMigrations();
      await migration.runMigration();
    } catch (err) {
      console.log('Not have migrations table!');
      await migration.createMigrations();
      await migration.runMigration();
    }
  } catch (error) {
    console.error('createSqliteConnection error', error);
  }
};

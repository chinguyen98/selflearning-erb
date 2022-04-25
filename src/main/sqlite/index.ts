import { app } from 'electron';
import path from 'path';
import { DataSource } from 'typeorm';
import Photo from './entity/Photo';

const sqliteDbPath: string = path.join(app.getPath('userData'), 'db.sqlite');

export const SqliteDataSource = new DataSource({
  type: 'sqlite',
  database: sqliteDbPath,
  entities: [Photo],
  migrations: [],
  logging: true,
});

export const createSqliteConnection = async () => {
  try {
    await SqliteDataSource.initialize();

    /* Init successfully */
    console.log('Init sqlite successfully');

    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    await SqliteDataSource.manager.save(photo);
  } catch (error) {
    console.error('createSqliteConnection error', error);
  }
};

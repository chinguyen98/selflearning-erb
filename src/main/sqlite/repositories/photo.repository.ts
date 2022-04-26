import Photo from '../entity/Photo';
import { SqliteDataSource } from '../index';

class PhotoRepository {
  async addPhoto(name: string): Promise<Photo> {
    const photo = new Photo();
    photo.name = name;
    return await SqliteDataSource.manager.save(photo);
  }
}

export default PhotoRepository;

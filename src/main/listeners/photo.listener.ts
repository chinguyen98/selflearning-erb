import {
  AddPhotoParamsType,
  AddPhotoReturnType,
  PHOTO_BRIDGE_CHANNELS,
  PHOTO_DTO,
} from '../../bridge/photo.bridge';
import { ipcMain } from 'electron';
import PhotoRepository from '../sqlite/repositories/photo.repository';

const photoRespository = new PhotoRepository();

const addNewPhoto = () => {
  ipcMain.handle(
    PHOTO_BRIDGE_CHANNELS.ADD,
    async (_, { name }: AddPhotoParamsType): Promise<AddPhotoReturnType> => {
      try {
        const photo = await photoRespository.addPhoto(name);
        return photo;
      } catch (err) {
        return null;
      }
    }
  );
};

const photoListener = (): void => {
  addNewPhoto();
};

export default photoListener;

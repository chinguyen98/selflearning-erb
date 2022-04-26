import {
  AddPhotoParamsType,
  PHOTO_BRIDGE_CHANNELS,
} from '../../bridge/photo.bridge';
import { ipcMain } from 'electron';

const addNewPhoto = () => {
  ipcMain.handle(
    PHOTO_BRIDGE_CHANNELS.ADD,
    async (_, { name }: AddPhotoParamsType): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return `Get OK ${name}`;
    }
  );
};

const photoListener = (): void => {
  addNewPhoto();
};

export default photoListener;

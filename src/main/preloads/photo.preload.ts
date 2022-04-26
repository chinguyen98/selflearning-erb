import {
  AddPhotoParamsType,
  AddPhotoReturnType,
  IPhotoBridge,
  PHOTO_BRIDGE_API_KEY,
  PHOTO_BRIDGE_CHANNELS,
} from 'bridge/photo.bridge';
import { contextBridge, ipcRenderer } from 'electron';

const addPhoto = async ({
  name,
}: AddPhotoParamsType): Promise<AddPhotoReturnType> => {
  const message: AddPhotoReturnType = await ipcRenderer.invoke(
    PHOTO_BRIDGE_CHANNELS.ADD,
    { name }
  );
  return message;
};

const photoRenderer: IPhotoBridge = {
  addPhoto,
};

contextBridge.exposeInMainWorld(PHOTO_BRIDGE_API_KEY, {
  ...photoRenderer,
});

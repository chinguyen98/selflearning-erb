export const PHOTO_BRIDGE_API_KEY = 'apiPhoto';

export const PHOTO_BRIDGE_CHANNELS = {
  ADD: 'photo:add',
};

type PHOTO_DTO = {
  name: string;
};

export type AddPhotoParamsType = Pick<PHOTO_DTO, 'name'>;
export interface IPhotoBridge {
  addPhoto: (data: AddPhotoParamsType) => Promise<string>;
}

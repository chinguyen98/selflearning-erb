export const PHOTO_BRIDGE_API_KEY = 'apiPhoto';

export const PHOTO_BRIDGE_CHANNELS = {
  ADD: 'photo:add',
};

export type PHOTO_DTO = {
  id: number;
  name: string;
};

export type AddPhotoParamsType = Pick<PHOTO_DTO, 'name'>;
export type AddPhotoReturnType = Promise<PHOTO_DTO | null>;
export interface IPhotoBridge {
  addPhoto: (data: AddPhotoParamsType) => Promise<AddPhotoReturnType>;
}

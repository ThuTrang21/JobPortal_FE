import { IAppState } from './interface';

export const initialState: IAppState = {
  navigate: undefined,

  // * upload images
  loadingUploadImages: false,
  uploadedImages: [],
  errorUploadImages: {},

  //get province
  provinces: [],

  districts: [],
};

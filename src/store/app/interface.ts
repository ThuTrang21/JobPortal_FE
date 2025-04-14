import { NavigateFunction } from 'react-router-dom';
import { AnyType, IProvince,  } from '../../interfaces/common';

export interface IAppState {
  navigate?: NavigateFunction;

  // * upload images
  loadingUploadImages: boolean;
  uploadedImages: string[];
  errorUploadImages: AnyType;

  //get province
  provinces: IProvince[];

  districts: AnyType[];
}

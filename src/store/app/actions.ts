import { createReduxAction, createReduxActions } from '../reduxActions';
import * as types from './types';

export const setNavigateFunction = createReduxAction(types.SET_NAVIGATE_FUNCTION);
export const navigate = createReduxAction(types.NAVIGATE);

// * upload images
export const clearUploadImages = createReduxAction(types.CLEAR_UPLOAD_IMAGES);
export const [uploadImages, uploadImagesSuccess, uploadImagesFail] = createReduxActions(
  types.UPLOAD_IMAGES,
);

//get province
export const [getProvince, getProvinceSuccess, getProvinceFail] = createReduxActions(
  types.GET_PROVINCE,
);

//get district
export const [getDistrict, getDistrictSuccess, getDistrictFail] = createReduxActions(
  types.GET_DISTRICT,
);
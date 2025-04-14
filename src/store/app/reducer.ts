import { produce } from 'immer';
import { IAction } from '../interface';
import { initialState } from './constants';
import { IAppState } from './interface';
import * as types from './types';

export default function appReducer(state: IAppState = initialState, action: IAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.SET_NAVIGATE_FUNCTION:
        draft.navigate = action.payload;
        break;

      // * upload images
      case types.CLEAR_UPLOAD_IMAGES: {
        draft.loadingUploadImages = false;
        draft.uploadedImages = [];
        draft.errorUploadImages = {};
        break;
      }

      case types.UPLOAD_IMAGES: {
        draft.loadingUploadImages = true;
        draft.uploadedImages = [];
        draft.errorUploadImages = {};
        break;
      }

      case types.UPLOAD_IMAGES_SUCCESS: {
        draft.loadingUploadImages = false;
        draft.uploadedImages = action.payload;
        draft.errorUploadImages = {};
        break;
      }

      case types.UPLOAD_IMAGES_FAIL: {
        draft.loadingUploadImages = false;
        draft.uploadedImages = [];
        draft.errorUploadImages = action.payload;
        break;
      }

      //get province
      case types.GET_PROVINCE: {
        draft.provinces = [];
        break;
      }
      case types.GET_PROVINCE_SUCCESS: {
        draft.provinces = action.payload;
        break;
      }
      case types.GET_PROVINCE_FAIL: {
        draft.provinces = [];
        break;
      }


      //get district
      case types.GET_DISTRICT: {
        draft.districts = [];
        break;
      }
      case types.GET_DISTRICT_SUCCESS: {
        draft.districts = action.payload;
        break;
      }
      case types.GET_DISTRICT_FAIL: {
        draft.districts = [];
        break;
      }

      default:
        break;
    }
  });
}

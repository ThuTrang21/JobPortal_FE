import { produce } from 'immer';
import { IAction } from '../interface';
import { initialState } from './constants';
import {  IUserState } from './interface';
import * as types from './types';

export default function userReducer(state: IUserState = initialState, action: IAction) {
  return produce(state, (draft) => {
    switch (action.type) {

      //update user
      case types.CLEAR_UPDATE_USER:
        draft.loadingUpdateUser = false;
        draft.errorUpdateUser = '';
        break;

      case types.UPDATE_USER:
        draft.loadingUpdateUser = true;
        draft.errorUpdateUser = '';
        break;

      case types.UPDATE_USER_SUCCESS:
        draft.loadingUpdateUser = false;
        draft.userInfo = action.payload;
        draft.errorUpdateUser = '';
        break;

      case types.UPDATE_USER_FAIL:
        draft.loadingUpdateUser = action.payload;
        draft.loadingUpdateUser = false;
        break;


      // * get user info
      case types.CLEAR_USER_INFO: {
        draft.userInfo = undefined;
        break;
      }

      case types.GET_USER_INFO: {
        draft.userInfo = action.payload;
        break;
      }

      case types.GET_USER_INFO_SUCCESS: {
        draft.userInfo = action.payload;
        break;
      }

      case types.GET_USER_INFO_FAIL: {
        draft.userInfo = undefined;
        break;
      }

      default:
        break;
    }
  });
}

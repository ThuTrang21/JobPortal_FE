import { produce } from 'immer';
import { IAction } from '../interface';
import { initialState } from './constants';
import { IAuthState } from './interface';
import * as types from './types';

export default function authReducer(state: IAuthState = initialState, action: IAction) {
  return produce(state, (draft) => {
    switch (action.type) {
     
      // * refresh token
      case types.CLEAR_REFRESH_TOKEN: {
        draft.loadingRefreshToken = false;
        draft.errorRefreshToken = {};
        break;
      }

      case types.REFRESH_TOKEN: {
        draft.loadingRefreshToken = true;
        draft.errorRefreshToken = {};
        break;
      }

      case types.REFRESH_TOKEN_SUCCESS: {
        draft.loadingRefreshToken = false;
        draft.errorRefreshToken = {};
        break;
      }

      case types.REFRESH_TOKEN_FAIL: {
        draft.loadingRefreshToken = false;
        draft.errorRefreshToken = action.payload;
        break;
      }

      //register
      case types.CLEAR_REGISTER_INFO: {
        draft.loadingRegister = false;
        draft.errorRegister = {};
        draft.successRegister = false;
        break;
      }

      case types.REGISTER: {
        draft.loadingRegister = true;
        draft.errorRegister = {};
        draft.successRegister = false;
        break;
      }

      case types.REGISTER_SUCCESS: {
        draft.loadingRegister = false;
        draft.errorRegister = {};
        draft.successRegister = true;
        break;
      }

      case types.REGISTER_FAIL: {
        draft.loadingRegister = false;
        draft.errorRegister = action.payload;
        draft.successRegister = false;
        break;
      }


      // * logout
      case types.CLEAR_LOGOUT: {
        draft.loadingLogout = false;
        draft.errorLogout = {};
        break;
      }

      case types.LOGOUT: {
        draft.loadingLogout = true;
        draft.errorLogout = {};
        
        break;
      }

      case types.LOGOUT_SUCCESS: {
        draft.loadingLogout = false;
        draft.errorLogout = {};
        break;
      }

      case types.LOGOUT_FAIL: {
        draft.loadingLogout = false;
        draft.errorLogout = action.payload;
        break;
      }

      //Login
      case types.CLEAR_LOGIN_INFO: {
        draft.errorLogin = {};
        draft.loadingLogin = false;
        draft.loginSuccess = false;
        draft.loadingUserInfo = false;
        break;
      }

      case types.LOGIN: {
        draft.errorLogin = {};
        draft.loadingLogin = true;
        draft.loginSuccess = false;
        draft.loadingUserInfo = true;
        break;
      }

      case types.LOGIN_SUCCESS: {
        draft.errorLogin = {};
        draft.loadingLogin = false;
        draft.loginSuccess = true;
        draft.loadingUserInfo = false;
        break;
      }

      case types.LOGIN_FAIL: {
        draft.errorLogin = action.payload;
        draft.loadingLogin = false;
        draft.loginSuccess = false;
        break;
      }

      default:
        break;
    }
  });
}

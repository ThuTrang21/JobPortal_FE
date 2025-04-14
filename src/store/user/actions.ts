import { createReduxAction, createReduxActions } from '../reduxActions';
import * as types from './types';

//update user
export const clearUpdateUser = createReduxAction(types.CLEAR_UPDATE_USER);
export const [updateUser, updateUserSuccess, updateUserFail] = createReduxActions(
  types.UPDATE_USER,
);


export const clearUserInfo = createReduxAction(types.CLEAR_USER_INFO);
export const [getUserInfo, getUserInfoSuccess, getUserInfoFail] = createReduxActions(
  types.GET_USER_INFO,
);

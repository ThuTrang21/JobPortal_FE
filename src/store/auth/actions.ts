import { createReduxAction, createReduxActions } from '../reduxActions';
import * as types from './types';

export const [authentication, authenticationSuccess, authenticationFail] = createReduxActions(
  types.AUTHENTICATION,
);



//register
export const [register, registerSuccess, registerFail] = createReduxActions(types.REGISTER);
export const clearRegisterInfo = createReduxAction(types.CLEAR_REGISTER_INFO);


// * logout
export const clearLogout = createReduxAction(types.CLEAR_LOGOUT);
export const [logout, logoutSuccess, logoutFail] = createReduxActions(types.LOGOUT);

// * login
export const clearLoginInfo = createReduxAction(types.CLEAR_LOGIN_INFO);
export const [login, loginSuccess, loginFail] = createReduxActions(types.LOGIN);

// * refresh token
export const clearRefreshToken = createReduxAction(types.CLEAR_REFRESH_TOKEN);
export const [refreshToken, refreshTokenSuccess, refreshTokenFail] = createReduxActions(
  types.REFRESH_TOKEN,
);


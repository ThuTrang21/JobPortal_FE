import { IAuthState } from './interface';

export const initialState: IAuthState = {
  // * user info
  loadingUserInfo: false,
  errorUserInfo: {},

  // * logout
  loadingLogout: false,
  errorLogout: {},

  errorRefreshToken: {},
  loadingRefreshToken: false,

  //login
  loadingLogin: false,
  errorLogin: {},
  loginSuccess : false,
  
  //register
  loadingRegister: false,
  errorRegister: {},
  successRegister : false,

  
};

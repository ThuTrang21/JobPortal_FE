import { AnyType } from "../../interfaces/common";


export interface IAuthState {
  loadingUserInfo: boolean;

  errorUserInfo: AnyType;

  loadingLogout: boolean;
  errorLogout: AnyType;

  errorRefreshToken: AnyType;
  loadingRefreshToken: boolean;

  //login
  loadingLogin: boolean;
  errorLogin: AnyType;
  loginSuccess : boolean;

  //register
  loadingRegister: boolean;
  errorRegister: AnyType;
  successRegister : boolean;

}

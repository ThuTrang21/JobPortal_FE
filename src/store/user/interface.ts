import { IUserInfo } from "../../interfaces/auth";


export interface IUserState {

  loadingUpdateUser: boolean;
  errorUpdateUser: string;
  userInfo?: IUserInfo;

}

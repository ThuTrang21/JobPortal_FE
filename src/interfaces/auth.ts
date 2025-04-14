import { ICompany } from "./company";

export interface IUserInfo {
  id: string;
  fullName: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  gender: string;
  role: string;
  createdAt: string;
  company: ICompany;

}

export interface ILoginRequest {
  email: string;
  password: string;
}


export interface ILoginResponse {
  jwt: string;
  refreshToken: string;
  message: string;
  role: string;
}



export interface IRegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  company: ICompanyRequest;
}

export interface ICompanyRequest {
  name: string;
  taxCode: string;
  industries: {id:number}[];
}

export interface IRegisterResponse {
  jwt: string;
  message: string;
  role: string;
}
export interface ITokenInfo {
  refreshToken: string;
  jwt: string;
}


export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  switchToRegister: () => void;
}

export interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  switchToLogin: () => void;
}
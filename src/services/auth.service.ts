import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../interfaces/auth";
import { publicRequest } from "../utils/request";



const authService = {
  login: ({ email, password }: ILoginRequest): Promise<ILoginResponse> =>
    publicRequest.request({
      url: '/auth/login',
      method: 'POST',
      data: { email, password },
    }),

    register: ({ fullName, phone, email, password, role, company }: IRegisterRequest): Promise<IRegisterResponse> =>
      publicRequest.request({
        url: "/auth/signup",
        method: "POST",
        data: {
          fullName,
          phone,
          email,
          password,
          role,
          ...(company ? { company } : {}), // Chỉ thêm company nếu tồn tại
        },
      }),

  refreshToken: (refreshToken: string): Promise<ILoginResponse> =>
    publicRequest.request({
      method: 'POST',
      url: '/auth/refresh-token',
      data: { refreshToken: refreshToken },
    }),


};

export default authService;

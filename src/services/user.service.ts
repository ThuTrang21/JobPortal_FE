import { IUserInfo } from "../interfaces/auth"
import { IUpdateUserRequest } from "../interfaces/user"
import { privateRequest, publicRequest } from "../utils/request"


const userService = {
    updateUser: (id: string, { fullName, birthday, gender, phone, address, avatar }: IUpdateUserRequest): Promise<IUserInfo> =>
        publicRequest.request({
            url: `/api/user/${id}`,
            method: 'PUT',
            data: { fullName, birthday, gender, phone, address, avatar },
        }),
    getUserInfo: (): Promise<IUserInfo> =>
        privateRequest.request({
            url: '/api/user/profile',
            method: 'GET',
        }),
}

export default userService
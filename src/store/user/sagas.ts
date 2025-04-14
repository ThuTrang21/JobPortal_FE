import { PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/auth";
import userService from "../../services/user.service";
import { call, put, takeLatest } from "redux-saga/effects";
import { IUpdateUserRequest } from "../../interfaces/user";
import { putWait, withCallback } from "redux-saga-callback";
import { getUserInfoFail, getUserInfoSuccess, updateUserFail, updateUserSuccess } from "./actions";
import * as types from "./types";
import { AnyType } from "../../interfaces/common";
import { showErrorSaga } from "../app/sagas";





function* updateUserSaga({ payload }: PayloadAction<IUpdateUserRequest & { id: string }>) {
  try {


    const { id, ...data } = payload;
    const res: IUserInfo = yield call(userService.updateUser, id, data);

    yield putWait(updateUserSuccess(res));
      }
  catch (error) {
    yield put(updateUserFail(error));
  }
}
function* getUserInfoSaga() {
  try {
    const userInfo: IUserInfo = yield call(userService.getUserInfo);
    yield put(getUserInfoSuccess(userInfo));
    return true;
  } catch (error) {
    yield call(showErrorSaga, error);
    yield put(getUserInfoFail(error));
    return false;
  }
}



export default function* userSagas() {
  yield takeLatest(types.UPDATE_USER, updateUserSaga);
  yield takeLatest(types.GET_USER_INFO, withCallback(getUserInfoSaga as AnyType));
}

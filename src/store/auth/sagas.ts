
import { PayloadAction } from '@reduxjs/toolkit';
import * as types from './types';
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, ITokenInfo, IUserInfo } from '../../interfaces/auth';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { loginFail, loginSuccess, logoutFail, logoutSuccess, refreshToken, refreshTokenFail, refreshTokenSuccess, registerFail, registerSuccess } from './actions';
import { putWait, withCallback } from 'redux-saga-callback';
import { navigate } from '../app/actions';
import { routes } from '../../utils/routes';
import authService from '../../services/auth.service';
import localStorageService from '../../utils/localStorage';
import { AnyType } from '../../interfaces/common';
import { get, isEmpty } from 'lodash';
import { showErrorSaga } from '../app/sagas';
import { clearUserInfo, getUserInfo } from '../user/actions';
import { selectUserInfo } from '../user/selectors';
import { clearCompanyInfo } from '../company/action';


function* loginSaga({ payload }: PayloadAction<ILoginRequest & { roleRequired?: string }>) {
  try {
    const { roleRequired, ...loginPayload } = payload;
    const res: ILoginResponse = yield call(authService.login, loginPayload);


    if (roleRequired && res.role !== roleRequired) {
      yield put(loginFail('Tài khoản không đúng quyền hạn để đăng nhập trang này.'));
      return;
    }

    yield call(setAuthenticationInfo as AnyType, res);
    yield put(getUserInfo());
    yield put(loginSuccess());
    if (res.role === 'ROLE_EMPLOYER') {
      yield putWait(navigate(routes.EMPLOYER_MANAGEPOST));
    }
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* logoutSaga({ payload }: PayloadAction<{ role?: string }>) {
  try {
    localStorageService.clearTokens();


    if (payload?.role === 'ROLE_JOB_SEEKER') {
      yield putWait(navigate(routes.HOME));
    } else {
      yield putWait(navigate(routes.EMPLOYER_LOGIN));
    }
    yield put(clearUserInfo());
    yield put(clearCompanyInfo());
    yield put(logoutSuccess());
  } catch (error) {
    yield call(showErrorSaga, error);
    yield put(logoutFail(error));
  }
}

function* registerSaga({ payload }: PayloadAction<IRegisterRequest>) {
  try {
    const res: IRegisterResponse = yield call(authService.register, payload);

    if (res.role === 'ROLE_EMPLOYER') {
      yield putWait(navigate(routes.EMPLOYER_LOGIN));
    }
    yield put(registerSuccess());

  }
  catch (error) {
    yield put(registerFail(error));
  }
}

function* setAuthenticationInfo(data: ITokenInfo) {
  const { jwt, refreshToken } = data;

  yield localStorageService.setAccessToken(jwt);
  yield localStorageService.setRefreshToken(refreshToken);


}

function* refreshTokenSaga() {
  try {
    const token = localStorageService.getRefreshToken();
    const res: ILoginResponse = yield call(authService.refreshToken, token);


    yield call(setAuthenticationInfo as AnyType, res);

    yield put(refreshTokenSuccess());
    return true;
  } catch (error) {
    localStorageService.clearTokens();
    yield put(refreshTokenFail(error));
    return false;
  }
}
function* authenticationSaga({
  payload,
}: PayloadAction<{ isAuthRoute?: boolean; isPrivateRoute?: boolean; isPublicRoute?: boolean }>) {
  const isAuthRoute = get(payload, 'isAuthRoute', false);
  const isPrivateRoute = get(payload, 'isPrivateRoute', false);
  const isPublicRoute = get(payload, 'isPublicRoute', false);

  const isEmptyAccessToken = localStorageService.isEmptyAccessToken();
  const isEmptyRefreshToken = localStorageService.isEmptyRefreshToken();

  let isRefreshTokenRequired = localStorageService.isRefreshTokenRequired();
  let isAuthorized = false;

  const userInfo: IUserInfo = yield select(selectUserInfo);

  if (isEmpty(userInfo)) {
    if (!isEmptyAccessToken && !isEmptyRefreshToken) {
      const res: IUserInfo = yield putWait(getUserInfo());

      if (res) {
        isAuthorized = true;
      } else {
        isRefreshTokenRequired = true;
      }
    }

    if (isRefreshTokenRequired) {
      const res: boolean = yield putWait(refreshToken());

      if (res) {
        const userInfoRes: IUserInfo = yield putWait(getUserInfo());
        if (userInfoRes) {
          isAuthorized = true;
        } else {
          localStorageService.clearTokens();
        }
      }
    }
  } else {
    if (isEmptyAccessToken && isEmptyRefreshToken) {
      isAuthorized = false;
    } else isAuthorized = true;
  }

  if (isPublicRoute) return;

  if (isAuthRoute) {
    if (isAuthorized) {
      return routes.HOME;
    }

    return;
  }

  if (isPrivateRoute) {
    if (!isAuthorized) {
      return routes.EMPLOYER_LOGIN;
    }
  }
}


export default function* authSagas() {
  yield takeLatest(types.LOGIN, loginSaga);
  yield takeLatest(types.REGISTER, registerSaga);
  yield takeLatest(types.REFRESH_TOKEN, withCallback(refreshTokenSaga as AnyType));
  yield takeLatest(types.AUTHENTICATION, withCallback(authenticationSaga as AnyType));
  yield takeLatest(types.LOGOUT, logoutSaga);
}

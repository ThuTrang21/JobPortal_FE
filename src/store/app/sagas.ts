import { get} from 'lodash';
import { NavigateFunction } from 'react-router-dom';

import { putWait, withCallback } from 'redux-saga-callback';
import {call, put, select, takeLatest } from 'redux-saga/effects';
import { getDistrictFail, getDistrictSuccess, getProvinceFail, getProvinceSuccess, navigate } from './actions';
import { selectNavigate } from './selectors';
import * as types from './types';
import { AnyType } from '../../interfaces/common';
import { authentication } from '../auth/actions';
import { toast } from 'react-toastify';
import axios from 'axios';

export function* showErrorSaga(error: AnyType) {
  if (error?.status === 401) {
    const response: string = yield putWait(authentication({ isPrivateRoute: true }));

    yield putWait(navigate(response));
  }

  const msg = get(error, 'detail') || get(error, 'message') || error;

  const rootError = get(error, 'rootError');

  if (rootError) {
    console.error(error);
  }

  yield toast.error(msg);
}

function* navigateSaga({ payload }: AnyType) {
  const navigate: NavigateFunction = yield select(selectNavigate);
  yield navigate(payload);
}

// function* uploadImagesSaga({ payload }: PayloadAction<{ images: File[] }>) {
//   try {
//     const { images } = payload;
//     const uploadInfo: { key: string; url: string }[] = yield all(
//       map(images, ({ name }) =>
//         call(mediaService.generateImageUploadUrl as AnyType, {
//           filename: name,
//           usedFor: 'products',
//         }),
//       ),
//     );
//     const urls = map(uploadInfo, 'url');
//     const keys = map(uploadInfo, 'key');

//     yield all(map(urls, (url, idx) => call(mediaService.uploadImage, { url, file: images[idx] })));
//     yield put(uploadImagesSuccess(keys));
//   } catch (error) {
//     yield call(showErrorSaga, error);
//     yield put(uploadImagesFail(error));
//   }
// }

function* getProvinceSaga(): any {
  try {
    const response = yield call(() => axios.get('https://provinces.open-api.vn/api/p/'));
    yield put(getProvinceSuccess(response.data));
  } catch (error) {
    yield put(getProvinceFail(error));
  }
}

function* getDistrictSaga({ payload }: AnyType): any {
  try {
    const response = yield call(() => axios.get(`https://provinces.open-api.vn/api/p/${payload}?depth=2`));
    console.log('response', response.data);
    yield put(getDistrictSuccess(response.data.districts));
  }
  catch (error) {
    yield put(getDistrictFail(error));
  }
}

export default function* appSagas() {
  yield takeLatest(types.NAVIGATE, withCallback(navigateSaga as AnyType));
  // yield takeLatest(types.UPLOAD_IMAGES, withCallback(uploadImagesSaga as AnyType));
  yield takeLatest(types.GET_PROVINCE, getProvinceSaga);
  yield takeLatest(types.GET_DISTRICT, getDistrictSaga);
}

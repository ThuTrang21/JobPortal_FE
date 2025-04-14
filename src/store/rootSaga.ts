import { all, call } from "redux-saga/effects";
import authSagas from "./auth/sagas";
import appSagas from "./app/sagas";
import userSagas from "./user/sagas";
import industrySagas from "./industry/saga";
import companySaga from "./company/saga";
import { fieldSaga } from "./field/saga";
import jobSagas from "./job/saga";


export default function* rootSaga() {
  yield all([
    call(appSagas),
    call(authSagas),
    call(userSagas),
    call(industrySagas),
    call(companySaga),
    call(fieldSaga),
    call(jobSagas),
  ]);
}


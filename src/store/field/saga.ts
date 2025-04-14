import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getJobRolesByFieldIdFail, getJobRolesByFieldIdSuccess } from "./action";
import fieldService from "../../services/field.service";
import { IJobRole } from "../../interfaces/industry";
import * as types from "./types";
function* getJobRolesByFieldIdSaga({payload}:PayloadAction<number>){

    try {
        const response:IJobRole[] = yield call(fieldService.getJobRolesByFieldId, payload);
        yield put(getJobRolesByFieldIdSuccess(response));
    } catch (error) {
        yield put(getJobRolesByFieldIdFail());
    }
}
export function* fieldSaga() {
    yield takeLatest( types.GET_JOB_ROLES_BY_FIELD_ID,getJobRolesByFieldIdSaga);
}

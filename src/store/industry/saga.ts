import { call, put, takeLatest } from "redux-saga/effects";
import industryService from "../../services/industry.service";
import { getAllIndustriesFail, getAllIndustriesSuccess, getFieldsByIndustryIdFail, getFieldsByIndustryIdSuccess } from "./actions";
import * as types from "./types";
import { IField, IIndustry } from "../../interfaces/industry";
import { PayloadAction } from "@reduxjs/toolkit";

function* getAllIndustriesSaga() {
    try {
        const res:IIndustry[] = yield call(industryService.getAllIndustries);
        yield put(getAllIndustriesSuccess(res));
    } catch (error) {
        yield put(getAllIndustriesFail(error));
    }
}

function* getFieldsByIndustryIdSaga({ payload }: PayloadAction<number>) {
    try {
        
        const res:IField[] = yield call(industryService.getFieldsByIndustryId, payload);

        yield put(getFieldsByIndustryIdSuccess(res));
    } catch (error) {
        yield put(getFieldsByIndustryIdFail(error));
    }
}
function* increaseSearchCountSaga({ payload }: PayloadAction<number[]>) {
    try {
        yield call(industryService.increaseSearchCount, payload);
    } catch (error) {
        console.log(error);
    }
}

export default function* industrySagas() {
    yield takeLatest(types.GET_ALL_INDUSTRIES, getAllIndustriesSaga);
    yield takeLatest(types.GET_FIELDS_BY_INDUSTRY_ID, getFieldsByIndustryIdSaga );
    yield takeLatest(types.INCREASE_SEARCH_COUNT, increaseSearchCountSaga );
}
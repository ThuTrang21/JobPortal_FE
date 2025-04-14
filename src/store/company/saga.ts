import { call, put, takeLatest } from "redux-saga/effects";
import companyService from "../../services/company.service";
import { ICompany } from "../../interfaces/company";
import * as types from "./types";
import { getAllCompanyFail, getAllCompanySuccess, getCompaniesByIndustryIdFail, getCompaniesByIndustryIdSuccess, getCompanyIndustriesFail, getCompanyIndustriesSuccess, getCompanyInfoFail, getCompanyInfoSuccess, updateCompanyFail, updateCompanySuccess } from "./action";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IIndustry } from "../../interfaces/industry";


function* getCompanySaga() {
  try {
    const response: ICompany = yield call(companyService.getCompany);
    yield put(getCompanyInfoSuccess(response));
  } catch (error) {
    yield put(getCompanyInfoFail(error));
  }
}

function* updateCompanySaga({ payload }: PayloadAction<{ data: ICompany; id: number }>) {
  const { data, id } = payload;
  try {

    const response: ICompany = yield call(companyService.updateCompany, { data, id });
    yield put(updateCompanySuccess(response));
    yield call(toast.success, ("Cập nhật thông tin công ty thành công"));
  } catch (error) {
    yield put(updateCompanyFail(error));
  }

}

function* getAllCompanySaga() {
  try {
    const response: ICompany[] = yield call(companyService.getAllCompany);
 
    yield put(getAllCompanySuccess(response));
  } catch (error) {
    yield put(getAllCompanyFail(error));
  }
}

function* getCompanyByIndustryIdSaga({ payload }: PayloadAction<number>) {
  try {

    const response: IIndustry[] = yield call(companyService.getCompanyByIndustryId, payload);

    yield put(getCompaniesByIndustryIdSuccess(response));
  } catch (error) {

    yield put(getCompaniesByIndustryIdFail(error));
  }
}

function* getCompanyIndustriesSaga({ payload }: PayloadAction<number>) {
  try {
    const response: ICompany[] = yield call(companyService.getIndustriesByCompanyId, payload);
    yield put(getCompanyIndustriesSuccess(response));
  } catch (error) {
    yield put(getCompanyIndustriesFail());
  }
}

export default function* companySaga() {
  yield takeLatest(types.GET_COMPANY_INFO, getCompanySaga);
  yield takeLatest(types.UPDATE_COMPANY, updateCompanySaga);
  yield takeLatest(types.GET_ALL_COMPANY, getAllCompanySaga);
  yield takeLatest(types.GET_COMPANIES_BY_INDUSTRY_ID, getCompanyByIndustryIdSaga);
  yield takeLatest(types.GET_COMPANY_INDUSTRIES, getCompanyIndustriesSaga);
}

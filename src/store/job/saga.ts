import { call, put, takeLatest } from "redux-saga/effects";
import jobService from "../../services/job.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "../../interfaces/job";
import { createJobFail, createJobSuccess, getAllJobsFail, getAllJobsSuccess, getJobByIdFail, getJobByIdSuccess, getJobsByIndustryIdFail, getJobsByIndustryIdSuccess } from "./action";
import * as types from "./types";
import { toast } from "react-toastify";

function* createJobSaga({payload}:PayloadAction<{ data: IJob }>) {
  try {
    yield call(jobService.createJob, payload);
    yield put(createJobSuccess());
    toast.success("Tạo việc làm thành công!");
  } catch (error) {
    yield put(createJobFail(error));
  }
}

//get jobs by industry
function* getJobsByIndustryIdSaga({payload}:PayloadAction<number>) {
  try {
    const jobs:IJob[] = yield call(jobService.getJobByIndustryId, payload);
    yield put(getJobsByIndustryIdSuccess(jobs));
  } catch (error) {
    yield put(getJobsByIndustryIdFail());
  }
}

//get all jobs
function* getAllJobsSaga() {
  try {
    const jobs:IJob[] = yield call(jobService.getAllJobs);
    yield put(getAllJobsSuccess(jobs));
  } catch (error) {
    yield put(getAllJobsFail());
  }
}

//get job by id
function* getJobByIdSaga({payload}:PayloadAction<number>) {
  try {
    const job:IJob = yield call(jobService.getJobById, payload);
    yield put(getJobByIdSuccess(job));
  } catch (error) {
    yield put(getJobByIdFail());
  }
}

export default function* jobSagas() {
    yield takeLatest(types.CREATE_JOB, createJobSaga);
    yield takeLatest(types.GET_JOBS_BY_INDUSTRY_ID, getJobsByIndustryIdSaga);
    yield takeLatest(types.GET_ALL_JOBS, getAllJobsSaga);
    yield takeLatest(types.GET_JOB_BY_ID, getJobByIdSaga);
}
import { call, put, takeLatest } from "redux-saga/effects";
import jobService from "../../services/job.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { IApplication, IJob } from "../../interfaces/job";
import { createJobFail, createJobSuccess, deleteJobSuccess, getAllJobsFail, getAllJobsSuccess, getJobByIdFail, getJobByIdSuccess, getJobsByCompanyId, getJobsByCompanyIdFail, getJobsByCompanyIdSuccess, getJobsByIndustryIdFail, getJobsByIndustryIdSuccess, searchJobFail, searchJobSuccess, updateStatusJob, updateStatusJobSuccess, viewJobFail } from "./action";
import * as types from "./types";
import { toast } from "react-toastify";

function* createJobSaga({ payload }: PayloadAction<{ data: IJob }>) {
  try {
    yield call(jobService.createJob, payload);
    yield put(createJobSuccess(payload.data));
    toast.success("Tạo việc làm thành công!");
    const jobs: IJob[] = yield call(jobService.getAllJobs);
    yield put(getAllJobsSuccess(jobs));
  } catch (error) {
    yield put(createJobFail(error));
  }
}

//get jobs by industry
function* getJobsByIndustryIdSaga({ payload }: PayloadAction<number>) {
  try {
    const jobs: IJob[] = yield call(jobService.getJobByIndustryId, payload);
    yield put(getJobsByIndustryIdSuccess(jobs));
  } catch (error) {
    yield put(getJobsByIndustryIdFail());
  }
}

//get all jobs
function* getAllJobsSaga() {
  try {
    const jobs: IJob[] = yield call(jobService.getAllJobs);
    yield put(getAllJobsSuccess(jobs));
  } catch (error) {
    yield put(getAllJobsFail());
  }
}

//get job by id
function* getJobByIdSaga({ payload }: PayloadAction<number>) {
  try {
    const job: IJob = yield call(jobService.getJobById, payload);
    yield put(getJobByIdSuccess(job));
  } catch (error) {
    yield put(getJobByIdFail());
  }
}
function* applyJobSaga({ payload }: PayloadAction<{ data: IApplication; id: number }>) {
  const { data, id } = payload;
  try {
    yield call(jobService.applyJob, { data, id });
    toast.success("Ứng tuyển thành công!");
  }
  catch (error) {

    toast.error("Ứng tuyển thất bại!");
  }
}

//update status job
function* updateStatusJobSaga({ payload }: PayloadAction<number>) {
  try {
    yield call(jobService.updateStatusJob, payload);
    yield put(updateStatusJobSuccess(payload));
  } catch (error) {
    toast.error("Cập nhật trạng thái thất bại!");
  }
}

//view job
function* viewJobSaga({ payload }: PayloadAction<number>) {
  try {
    yield call(jobService.viewJob, payload);
  } catch (error) {
    yield put(viewJobFail());
  }
}

//delete job
function* deleteJobSaga({ payload }: PayloadAction<number>) {
  try {
    yield call(jobService.deleteJob, payload);
    yield put(deleteJobSuccess(payload));
    toast.success("Xóa việc làm thành công!");
  } catch (error) {
    toast.error("Xóa việc làm thất bại!");
  }
}

//search job
function* searchJobSaga({ payload }: PayloadAction<{ params: Partial<IJob> }>) {
  
  try {
    const jobs: IJob[] = yield call(jobService.searchJob, payload.params);
    yield put(searchJobSuccess(jobs));
  } catch (error) {
    yield put(searchJobFail());
  }
}
//get jobs by company id
function* getJobsByCompanyIdSaga() {
  try {
    const jobs: IJob[] = yield call(jobService.getJobByCompanyId);
    yield put(getJobsByCompanyIdSuccess(jobs));
  } catch (error) {
    yield put(getJobsByCompanyIdFail());
  }
}

export default function* jobSagas() {
  yield takeLatest(types.CREATE_JOB, createJobSaga);
  yield takeLatest(types.GET_JOBS_BY_INDUSTRY_ID, getJobsByIndustryIdSaga);
  yield takeLatest(types.GET_ALL_JOBS, getAllJobsSaga);
  yield takeLatest(types.GET_JOB_BY_ID, getJobByIdSaga);
  yield takeLatest(types.APPLY_JOB, applyJobSaga);
  yield takeLatest(types.UPDATE_STATUS_JOB, updateStatusJobSaga);
  yield takeLatest(types.VIEW_JOB, viewJobSaga);
  yield takeLatest(types.DELETE_JOB, deleteJobSaga);
  yield takeLatest(types.SEARCH_JOB, searchJobSaga);
  yield takeLatest(types.GET_JOBS_BY_COMPANY_ID, getJobsByCompanyIdSaga);
}
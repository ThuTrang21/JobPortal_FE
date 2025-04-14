import { createActionTypes } from "../reduxActions";

const context = 'job';

export const [CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_FAIL] = createActionTypes(
    `${context}/CREATE_JOB`,
    );

//get jobs by industry
export const [GET_JOBS_BY_INDUSTRY_ID, GET_JOBS_BY_INDUSTRY_ID_SUCCESS, GET_JOBS_BY_INDUSTRY_ID_FAIL] = createActionTypes(
    `${context}/GET_JOBS_BY_INDUSTRY_ID`,
    );

    //get all jobs
export const [GET_ALL_JOBS, GET_ALL_JOBS_SUCCESS, GET_ALL_JOBS_FAIL] = createActionTypes(
    `${context}/GET_ALL_JOBS`,
    );

    //get job by id
export const [GET_JOB_BY_ID, GET_JOB_BY_ID_SUCCESS, GET_JOB_BY_ID_FAIL] = createActionTypes(
    `${context}/GET_JOB_BY_ID`,
    );
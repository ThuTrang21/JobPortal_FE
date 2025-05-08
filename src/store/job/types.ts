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

    //apply job
export const [APPLY_JOB, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL] = createActionTypes(
    `${context}/APPLY_JOB`,
);

//update status job
export const [UPDATE_STATUS_JOB, UPDATE_STATUS_JOB_SUCCESS, UPDATE_STATUS_JOB_FAIL] = createActionTypes(
    `${context}/UPDATE_STATUS_JOB`,
);

//view job
export const [VIEW_JOB, VIEW_JOB_SUCCESS, VIEW_JOB_FAIL] = createActionTypes(
    `${context}/VIEW_JOB`,
);
//
//delete job
export const [DELETE_JOB, DELETE_JOB_SUCCESS, DELETE_JOB_FAIL] = createActionTypes(
    `${context}/DELETE_JOB`,
);

//search job
export const [SEARCH_JOB, SEARCH_JOB_SUCCESS, SEARCH_JOB_FAIL] = createActionTypes(
    `${context}/SEARCH_JOB`,
);

//get jobs by company id
export const [GET_JOBS_BY_COMPANY_ID, GET_JOBS_BY_COMPANY_ID_SUCCESS, GET_JOBS_BY_COMPANY_ID_FAIL] = createActionTypes(
    `${context}/GET_JOBS_BY_COMPANY_ID`,
);


//application count
export const [APPLICATION_COUNT, APPLICATION_COUNT_SUCCESS, APPLICATION_COUNT_FAIL] = createActionTypes(
    `${context}/APPLICATION_COUNT`,
);
//has pay job
export const [HAS_PAY_JOB, HAS_PAY_JOB_SUCCESS, HAS_PAY_JOB_FAIL] = createActionTypes(
    `${context}/HAS_PAY_JOB`,
);

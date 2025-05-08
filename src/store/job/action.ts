import { createReduxActions } from "../reduxActions";
import * as types from "./types";

export const [createJob, createJobSuccess, createJobFail] = createReduxActions(
    types.CREATE_JOB,
)

//get jobs by industry
export const [getJobsByIndustryId, getJobsByIndustryIdSuccess, getJobsByIndustryIdFail] = createReduxActions(
    types.GET_JOBS_BY_INDUSTRY_ID,
)

//get all jobs
export const [getAllJobs, getAllJobsSuccess, getAllJobsFail] = createReduxActions(
    types.GET_ALL_JOBS,
)

//get job by id
export const [getJobById, getJobByIdSuccess, getJobByIdFail] = createReduxActions(
    types.GET_JOB_BY_ID,
)

//apply job
export const [applyJob, applyJobSuccess, applyJobFail] = createReduxActions(
    types.APPLY_JOB,
)

//update status job
export const [updateStatusJob, updateStatusJobSuccess, updateStatusJobFail] = createReduxActions(
    types.UPDATE_STATUS_JOB,
)

//view job
export const [viewJob, viewJobSuccess, viewJobFail] = createReduxActions(
    types.VIEW_JOB,
)

//delete job
export const [deleteJob, deleteJobSuccess, deleteJobFail] = createReduxActions(
    types.DELETE_JOB,
)

//search job
export const [searchJob, searchJobSuccess, searchJobFail] = createReduxActions(
    types.SEARCH_JOB,
)

//get jobs by company id
export const [getJobsByCompanyId, getJobsByCompanyIdSuccess, getJobsByCompanyIdFail] = createReduxActions(
    types.GET_JOBS_BY_COMPANY_ID,
)



//application count
export const [applicationCount, applicationCountSuccess, applicationCountFail] = createReduxActions(
    types.APPLICATION_COUNT,
)

//has pay job
export const [hasPayJob, hasPayJobSuccess, hasPayJobFail] = createReduxActions(
    types.HAS_PAY_JOB,
)

//update expired job
export const [updateExpiredJob, updateExpiredJobSuccess, updateExpiredJobFail] = createReduxActions(
    types.UPDATE_EXPIRED_JOB,
)
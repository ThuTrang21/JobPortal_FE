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
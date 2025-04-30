import { produce } from "immer";
import { IAction } from "../interface";
import { initialState } from "./constant";
import { IJobState } from "./interface";
import * as types from "./types";

export default function jobReducer(state: IJobState = initialState, action: IAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case types.CREATE_JOB:
                draft.loadingCreateJob = true;
                break;
            case types.CREATE_JOB_SUCCESS:
                draft.loadingCreateJob = false;
                draft.jobs = [action.payload, ...draft.jobs];
                break;
            case types.CREATE_JOB_FAIL:
                draft.loadingCreateJob = false;
                break;

            //get jobs by industry
            case types.GET_JOBS_BY_INDUSTRY_ID:
                break;
            case types.GET_JOBS_BY_INDUSTRY_ID_SUCCESS:
                draft.jobs = action.payload;
                break;
            case types.GET_JOBS_BY_INDUSTRY_ID_FAIL:
                draft.jobs = [];
                break;

            //get all jobs
            case types.GET_ALL_JOBS:
                break;
            case types.GET_ALL_JOBS_SUCCESS:
                draft.jobs = action.payload;
                break;
            case types.GET_ALL_JOBS_FAIL:
                draft.jobs = [];
                break;

            //get job by id
            case types.GET_JOB_BY_ID:
                draft.isLoadingJob = true;
                break;
            case types.GET_JOB_BY_ID_SUCCESS:
                draft.isLoadingJob = false;
                draft.job = action.payload;
                break;
            case types.GET_JOB_BY_ID_FAIL:
                draft.isLoadingJob = false;
                draft.job = undefined;
                break;

            //apply job
            case types.APPLY_JOB:
                break;
            case types.APPLY_JOB_SUCCESS:
                break;
            case types.APPLY_JOB_FAIL:
                break;

            //update status job
            case types.UPDATE_STATUS_JOB:
                break;
            case types.UPDATE_STATUS_JOB_SUCCESS:
                draft.jobs = draft.jobs.map((job) => {
                    if (job.id === action.payload) {
                        return { ...job, active: !job.active };
                    }
                    return job;
                });
                break;
            case types.UPDATE_STATUS_JOB_FAIL:
                break;


            //delete job
            case types.DELETE_JOB:
                break;
            case types.DELETE_JOB_SUCCESS:
                draft.jobs = draft.jobs.filter((job) => job.id !== action.payload);
                break;
            case types.DELETE_JOB_FAIL:
                break;
            //search job
            case types.SEARCH_JOB:
                
                break;
            case types.SEARCH_JOB_SUCCESS:
                draft.jobsFilter = action.payload;
                break;
            case types.SEARCH_JOB_FAIL:
                
                draft.jobsFilter = [];
                break;

                //get jobs by company id
            case types.GET_JOBS_BY_COMPANY_ID:
                break;
            case types.GET_JOBS_BY_COMPANY_ID_SUCCESS:
                draft.jobs = action.payload;
                break;
            case types.GET_JOBS_BY_COMPANY_ID_FAIL:
                draft.jobs = [];
                break;
            default:
                break;
        }
    });
}
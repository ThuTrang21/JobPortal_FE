import { produce } from "immer";
import { IAction } from "../interface";
import { initialState } from "./constant";
import { IJobState } from "./interface";
import * as types from "./types";

export default function jobReducer(state:IJobState=initialState, action:IAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case types.CREATE_JOB:
                draft.loadingCreateJob = true;
                break;
            case types.CREATE_JOB_SUCCESS:
                draft.loadingCreateJob = false;
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
            default:
                break;
        }
    });
}
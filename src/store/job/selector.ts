import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../interface";
import { initialState } from "./constant";
import { get } from "lodash";


const selectJob = (state: AppState) => state.job || initialState


export const selectJobs = createSelector([selectJob], (jobs) => get(jobs, 'jobs', []));
export const selectJobById = createSelector([selectJob], (job) => get(job, 'job', undefined));
export const selectIsLoadingJob = createSelector([selectJob], (loading) => get(loading, 'isLoadingJob', false));

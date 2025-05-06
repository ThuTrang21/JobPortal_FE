import { IJobState } from "./interface";

export const initialState: IJobState = {
    loadingCreateJob: false,
    jobs: [],
    jobsFilter: [],

    job: undefined,
    isLoadingJob: false,
    applicationCount: 0,
}
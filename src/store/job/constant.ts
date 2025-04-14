import { IJobState } from "./interface";

export const initialState: IJobState = {
    loadingCreateJob: false,
    jobs: [],

    job: undefined,
    isLoadingJob: false,
}
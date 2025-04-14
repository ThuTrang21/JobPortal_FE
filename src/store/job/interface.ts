import { IJob } from "../../interfaces/job";

export interface IJobState {
    loadingCreateJob: boolean;
    jobs: IJob[];

    job?: IJob;
    isLoadingJob: boolean;
}
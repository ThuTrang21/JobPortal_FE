import { IJob } from "../../interfaces/job";

export interface IJobState {
    loadingCreateJob: boolean;
    jobs: IJob[];
    jobsFilter: IJob[];

    job?: IJob;
    isLoadingJob: boolean;

    applicationCount : number;
}
import { AnyType, CreateData } from "../interfaces/common"
import { IJob } from "../interfaces/job"
import { privateRequest, publicRequest } from "../utils/request"

const jobService = {
    createJob: ({ data }: { data: CreateData<IJob> }): Promise<AnyType> =>
        privateRequest.request({
            url: '/job',
            method: 'POST',
            data
        }),

    getJobByIndustryId:(id:number): Promise<IJob[]> =>
        publicRequest.request({
            url: `/jobs/industry/${id}`,
            method: "GET",
        }),

    getAllJobs:(): Promise<IJob[]> =>
        publicRequest.request({
            url: `/jobs`,
            method: "GET",
        }),

    getJobById:(id:number): Promise<IJob> =>
        publicRequest.request({
            url: `/job/${id}`,
            method: "GET",
        }),

}

export default jobService
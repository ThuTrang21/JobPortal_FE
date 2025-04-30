import { get } from "lodash";
import { AnyType, CreateData } from "../interfaces/common"
import { IApplication, IJob, IJobFilter } from "../interfaces/job"
import { privateRequest, publicRequest } from "../utils/request"

const jobService = {
    createJob: ({ data }: { data: CreateData<IJob> }): Promise<AnyType> =>
        privateRequest.request({
            url: '/job',
            method: 'POST',
            data
        }),

    getJobByIndustryId: (id: number): Promise<IJob[]> =>
        publicRequest.request({
            url: `/jobs/industry/${id}`,
            method: "GET",
        }),

    getAllJobs: (): Promise<IJob[]> =>
        publicRequest.request({
            url: `/jobs`,
            method: "GET",
        }),

    getJobById: (id: number): Promise<IJob> =>
        publicRequest.request({
            url: `/job/${id}`,
            method: "GET",
        }),
    applyJob: ({ data, id }: { data: CreateData<IApplication>; id: number }): Promise<AnyType> =>
        privateRequest.request({
            url: `/job/${id}/apply`,
            method: 'POST',
            data
        }),

    updateStatusJob: (id: number): Promise<AnyType> =>
        privateRequest.request({
            url: `/admin/job/${id}/status`,
            method: 'PUT',
        }),

    viewJob: (id: number): Promise<AnyType> =>
        privateRequest.request({
            url: `/job/${id}/view`,
            method: 'POST',
        }),

    deleteJob: (id: number): Promise<AnyType> =>
        privateRequest.request({
            url: `/job/${id}`,
            method: 'DELETE',
        }),
        searchJob: (
            params: Partial<IJobFilter>
        ): Promise<IJob[]> => {
            const formattedParams = {
                ...params,
                industries: params.industries?.join(','),
                provinces: params.provinces?.join(','),
            };
        
            return publicRequest.request({
                url: `/jobs/search`,
                method: 'GET',
                params: formattedParams,
            });
        },

        getJobByCompanyId: (): Promise<IJob[]> =>
            privateRequest.request({
                url: `/jobs/company`,
                method: "GET",
            }),
}

export default jobService
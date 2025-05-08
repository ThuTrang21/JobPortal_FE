import { get, has } from "lodash";
import { AnyType, CreateData } from "../interfaces/common"
import { IApplication, IJob, IJobFilter } from "../interfaces/job"
import { privateRequest, publicRequest } from "../utils/request"
import { applicationCount } from "../store/job/action";

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
    hasAppliedJob: (id: number): Promise<boolean> =>
        privateRequest.request({
            url: `/jobs/${id}/has-applied`,
            method: "GET",
        }),

    applicationCount: (id: number): Promise<number> =>
        privateRequest.request({
            url: `/jobs/${id}/application-count`,
            method: "GET",
        }),
    payJob: (id: number): Promise<boolean> =>
        publicRequest.request({
            url: `/job/${id}/pay-success`,
            method: "POST",
        }),

    updateExpiredJob: ({ id, params }: { id: number; params: { expiredAt: string } }): Promise<String> =>
        privateRequest.request({
            url: `/admin/job/${id}/expiredAt`,
            method: "PUT",
            params
        }),
}

export default jobService
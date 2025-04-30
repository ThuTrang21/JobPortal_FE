import { publicRequest } from "../utils/request";

const industryService = {
    getAllIndustries: () =>
        publicRequest.request({
            url: '/industry',
            method: 'GET',
        }),
    getFieldsByIndustryId: (id: number) =>
        publicRequest.request({
            url: `/industry/${id}/fields`,
            method: 'GET',
        }),

    increaseSearchCount: (industryIds: number[]) =>
        publicRequest.request({
            url: `/industry/industries/increase-search-count`,
            method: 'POST',
            data:  industryIds ,
        }),
}

export default industryService;
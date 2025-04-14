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
        })
}

export default industryService;
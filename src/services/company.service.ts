import { CreateData } from "../interfaces/common";
import { ICompany } from "../interfaces/company";
import { privateRequest, publicRequest } from "../utils/request";

const companyService = {

    getCompany: () =>
        privateRequest.request({
            url: '/company',
            method: 'GET',
        }),
    updateCompany: ({ data, id }: { data: CreateData<ICompany>; id: number }): Promise<ICompany> =>

        privateRequest.request({
            url: `/company/${id}`,
            method: 'PUT',
            data

        }
        ),

    getAllCompany: () =>
        publicRequest.request({
            url: '/companies',
            method: 'GET',
        }),


    getCompanyByIndustryId: (id: number): Promise<ICompany[]> =>
        publicRequest.request({
            url: `/companies/industry/${id}`,
            method: "GET",
        }),

    getIndustriesByCompanyId: (id: number): Promise<ICompany[]> =>
        publicRequest.request({
            url: `/company/${id}/industries`,
            method: "GET",
        })

}
export default companyService;
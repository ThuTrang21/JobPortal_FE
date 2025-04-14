import { AnyType } from "../../interfaces/common";
import { ICompany } from "../../interfaces/company";
import { IIndustry } from "../../interfaces/industry";

export interface ICompanyState {
    companyInfo?: ICompany;
    errorCompanyInfo?: AnyType;

    industries:IIndustry[],

    companies: ICompany[];
}
import { IIndustry } from "./industry";

export interface ICompany {
    id: number;
    name: string;
    taxCode: string;
    companySize: string;
    address: string;
    phone: string;
    industries: IIndustry[];
    avatar?: string;
    jobCount?: number;
};


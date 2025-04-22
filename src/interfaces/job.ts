import { ICompany } from "./company";

export interface IJob {
    id: number;
    title: string;
    description: string;
    requirement: string;
    benefit: string;
    experience: string;
    expiredAt: string;
    workingTime: string;
    jobType: string;
    jobLevel: string;
    degree: string;
    quantity: number;
    genderRequirement: string;
    salaryType: string;
    salaryMin: number;
    salaryMax: number;

    province: string;
    district: string;
    address: string;

    industry: {
        id: number;
    }
    field: {
        id: number;
    }
    jobRole: {
        id: number;
    }

    deadline: string;
    company: ICompany;
    jobRoleName: string;
    industryName: string;
    fieldName: string;
    active: boolean;
    countApplication: number;
    viewCount: number;

}

export interface IApplication {
    coverLetter: string;
    fullName: string;
    email: string;
    phone: string;
}
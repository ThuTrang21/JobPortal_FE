import { IField, IIndustry } from "../../interfaces/industry";

export interface IIndustryState {
    loadingGetAllIndustries: boolean;
    errorGetAllIndustries: string;
    industries: IIndustry[];

    fields:IField[];
}
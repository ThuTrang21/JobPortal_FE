import { IIndustryState } from "./interface";

export const initialState: IIndustryState = {
    loadingGetAllIndustries: false,
    errorGetAllIndustries: '',
    industries: [],

    fields: [],
}
import { produce } from "immer";
import { IAction } from "../interface";
import { initialState } from "./constants";
import { ICompanyState } from "./interface";
import * as types from "./types";

export default function companyReducer(state: ICompanyState = initialState, action: IAction) {

    return produce(state, (draft) => {
        switch (action.type) {
            case types.GET_COMPANY_INFO:
                break;

            case types.GET_COMPANY_INFO_SUCCESS:
                draft.companyInfo = action.payload;
                break;

            case types.GET_COMPANY_INFO_FAIL:
                draft.companyInfo = undefined;
                draft.errorCompanyInfo = action.payload;
                break;


            // * update company
            case types.UPDATE_COMPANY:
                draft.companyInfo = undefined;
                break;

            case types.UPDATE_COMPANY_SUCCESS:
                draft.companyInfo = action.payload;
                break;

            case types.UPDATE_COMPANY_FAIL:
                draft.companyInfo = undefined;
                draft.errorCompanyInfo = action.payload;
                break;


            // * clear company info
            case types.CLEAR_COMPANY_INFO:
                draft.companyInfo = undefined;
                draft.errorCompanyInfo = {};
                break;

            // * get all company
            case types.GET_ALL_COMPANY:
                draft.companies = [];
                break;

            case types.GET_ALL_COMPANY_SUCCESS:
                draft.companies = action.payload;
                break;

            case types.GET_ALL_COMPANY_FAIL:
                draft.companies = [];
                break;

            // * get company by industry id
            case types.GET_COMPANIES_BY_INDUSTRY_ID:
                draft.companies = [];
                break;

            case types.GET_COMPANIES_BY_INDUSTRY_ID_SUCCESS:
                draft.companies = action.payload;
                break;

            case types.GET_COMPANIES_BY_INDUSTRY_ID_FAIL:
                draft.companies = [];
                break;

            //get industries by company id
            case types.GET_COMPANY_INDUSTRIES:
                draft.industries = [];
                break;

            case types.GET_COMPANY_INDUSTRIES_SUCCESS:
                draft.industries = action.payload;
                break;

            case types.GET_COMPANY_INDUSTRIES_FAIL:
                draft.industries = [];
                break;

            default:
                break;
        }
    })
}
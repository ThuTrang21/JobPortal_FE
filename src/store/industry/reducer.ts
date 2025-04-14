import { produce } from "immer";
import { IIndustryState } from "./interface";
import * as types from './types';
import { initialState } from "./constants";
import { IAction } from "../interface";

export default function industryReducer(state: IIndustryState = initialState, action: IAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case types.GET_ALL_INDUSTRIES:
                draft.loadingGetAllIndustries = true;
                draft.errorGetAllIndustries = '';
                break;
            case types.GET_ALL_INDUSTRIES_SUCCESS:
                draft.loadingGetAllIndustries = false;
                draft.industries = action.payload;
                draft.errorGetAllIndustries = '';
                break;
            case types.GET_ALL_INDUSTRIES_FAIL:
                draft.loadingGetAllIndustries = false;
                draft.errorGetAllIndustries = action.payload;
                break;


            // * get fields by industry id
            case types.GET_FIELDS_BY_INDUSTRY_ID:
                draft.fields = [];
                break;
            case types.GET_FIELDS_BY_INDUSTRY_ID_SUCCESS:
                draft.fields = action.payload;
                break;
            case types.GET_FIELDS_BY_INDUSTRY_ID_FAIL:
                draft.fields = [];
                break;

            default:
                break;
        }
    });
}
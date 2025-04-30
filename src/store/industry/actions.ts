import { createReduxActions } from "../reduxActions";
import * as types from './types';


export const [getAllIndustries, getAllIndustriesSuccess, getAllIndustriesFail] = createReduxActions(
    types.GET_ALL_INDUSTRIES,
);

export const [getFieldsByIndustryId, getFieldsByIndustryIdSuccess, getFieldsByIndustryIdFail] = createReduxActions(
    types.GET_FIELDS_BY_INDUSTRY_ID,
);

//increase search count
export const [increaseSearchCount, increaseSearchCountSuccess, increaseSearchCountFail] = createReduxActions(
    types.INCREASE_SEARCH_COUNT,
);
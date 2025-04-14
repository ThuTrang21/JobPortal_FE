import { createReduxAction, createReduxActions } from '../reduxActions';
import * as types from './types';


export const [getCompanyInfo, getCompanyInfoSuccess, getCompanyInfoFail] = createReduxActions(
  types.GET_COMPANY_INFO,
);

export const [updateCompany, updateCompanySuccess, updateCompanyFail] = createReduxActions(
  types.UPDATE_COMPANY,
);

export const clearCompanyInfo = createReduxAction(types.CLEAR_COMPANY_INFO);

export const [getAllCompany, getAllCompanySuccess, getAllCompanyFail] = createReduxActions(
  types.GET_ALL_COMPANY,
);

export const [getCompaniesByIndustryId, getCompaniesByIndustryIdSuccess, getCompaniesByIndustryIdFail] = createReduxActions(
  types.GET_COMPANIES_BY_INDUSTRY_ID,
);

export const [getCompanyIndustries, getCompanyIndustriesSuccess, getCompanyIndustriesFail] = createReduxActions(
  types.GET_COMPANY_INDUSTRIES,
);
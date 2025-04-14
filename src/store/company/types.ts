import { createActionTypes } from "../reduxActions";

const context = 'company';

// * get company info
export const [GET_COMPANY_INFO, GET_COMPANY_INFO_SUCCESS, GET_COMPANY_INFO_FAIL] = createActionTypes(
  `${context}/GET_COMPANY_INFO`
);

// * update company
export const[UPDATE_COMPANY, UPDATE_COMPANY_SUCCESS, UPDATE_COMPANY_FAIL] = createActionTypes(
  `${context}/UPDATE_COMPANY_INFO`
);

// * clear company info
export const CLEAR_COMPANY_INFO = `${context}/CLEAR_COMPANY_INFO`;

// * get all company
export const [GET_ALL_COMPANY, GET_ALL_COMPANY_SUCCESS, GET_ALL_COMPANY_FAIL] = createActionTypes(
  `${context}/GET_ALL_COMPANY`
);

// * get company by industry id
export const [GET_COMPANIES_BY_INDUSTRY_ID, GET_COMPANIES_BY_INDUSTRY_ID_SUCCESS, GET_COMPANIES_BY_INDUSTRY_ID_FAIL] = createActionTypes(
  `${context}/GET_COMPANIES_BY_INDUSTRY_ID`
);


// * get industries by company id
export const [GET_COMPANY_INDUSTRIES, GET_COMPANY_INDUSTRIES_SUCCESS, GET_COMPANY_INDUSTRIES_FAIL] = createActionTypes(
  `${context}/GET_COMPANY_INDUSTRIES`
);
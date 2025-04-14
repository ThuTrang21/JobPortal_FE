import { createActionTypes } from "../reduxActions";

const context = 'industry';

export const [GET_ALL_INDUSTRIES, GET_ALL_INDUSTRIES_SUCCESS, GET_ALL_INDUSTRIES_FAIL] = createActionTypes(
  `${context}/GET_ALL_INDUSTRIES`,
);

export const [GET_FIELDS_BY_INDUSTRY_ID, GET_FIELDS_BY_INDUSTRY_ID_SUCCESS, GET_FIELDS_BY_INDUSTRY_ID_FAIL] = createActionTypes(
  `${context}/GET_FIELDS_BY_INDUSTRY_ID`,
);
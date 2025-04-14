import { createActionTypes } from "../reduxActions";

const context = 'app';

export const SET_NAVIGATE_FUNCTION = `${context}/SET_NAVIGATE_FUNCTION`;
export const NAVIGATE = `${context}/NAVIGATE`;

// * upload images
export const CLEAR_UPLOAD_IMAGES = `${context}/CLEAR_UPLOAD_IMAGES`;
export const [UPLOAD_IMAGES, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAIL] = createActionTypes(
  `${context}/UPLOAD_IMAGES`,
);

//get province
export const[GET_PROVINCE, GET_PROVINCE_SUCCESS, GET_PROVINCE_FAIL] = createActionTypes(
  `${context}/GET_PROVINCE`,
);

//get district
export const[GET_DISTRICT, GET_DISTRICT_SUCCESS, GET_DISTRICT_FAIL] = createActionTypes(
  `${context}/GET_DISTRICT`,
);
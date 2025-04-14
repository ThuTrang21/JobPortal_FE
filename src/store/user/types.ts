import { createActionTypes } from "../reduxActions";

const context = 'user';

//update user
export const CLEAR_UPDATE_USER = `${context}/CLEAR_UPDATE_USER`;
export const [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL] = createActionTypes(
  `${context}/UPDATE_USER`,
);



// * user info
export const CLEAR_USER_INFO = `${context}/CLEAR_USER_INFO`;
export const [GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL] = createActionTypes(
  `${context}/GET_USER_INFO`,
);
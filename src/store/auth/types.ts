import { createActionTypes } from "../reduxActions";

const context = 'auth';


//Xac thuc
export const [AUTHENTICATION, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL] = createActionTypes(
  `${context}/AUTHENTICATION`,
);




//register
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL] = createActionTypes(
  `${context}/REGISTER`,
);
export const CLEAR_REGISTER_INFO = `${context}/CLEAR_REGISTER_INFO`;


// * logout
export const CLEAR_LOGOUT = `${context}/CLEAR_LOGOUT`;
export const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL] = createActionTypes(`${context}/LOGOUT`);

// * login
export const CLEAR_LOGIN_INFO = `${context}/CLEAR_LOGIN_INFO`;
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL] = createActionTypes(`${context}/LOGIN`);

// * refresh token
export const CLEAR_REFRESH_TOKEN = `${context}/REFRESH_TOKEN`;
export const [REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAIL] = createActionTypes(
  `${context}/REFRESH_TOKEN`,
);


import { createActionTypes } from "../reduxActions";

const context='field';

export const [GET_JOB_ROLES_BY_FIELD_ID, GET_JOB_ROLES_BY_FIELD_ID_SUCCESS, GET_JOB_ROLES_BY_FIELD_ID_FAIL] = createActionTypes(
  `${context}/GET_JOB_ROLES_BY_FIELD_ID`,
);
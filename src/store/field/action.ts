import { createReduxActions } from "../reduxActions";
import * as types from './types';

export const [getJobRolesByFieldId, getJobRolesByFieldIdSuccess, getJobRolesByFieldIdFail] = createReduxActions(
    types.GET_JOB_ROLES_BY_FIELD_ID,
)
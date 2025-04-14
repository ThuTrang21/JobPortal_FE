import { produce } from "immer";
import { IAction } from "../interface";
import { initialState } from "./contants";
import { IFieldState } from "./interface";
import * as types from "./types";
export function fieldReducer(state: IFieldState = initialState, action: IAction) {
    return produce(state, (draft) => {
        switch (action.type) {

            //get job roles by field id
            case types.GET_JOB_ROLES_BY_FIELD_ID:
                draft.jobRoles = [];
                break;
            case types.GET_JOB_ROLES_BY_FIELD_ID_SUCCESS:
                draft.jobRoles = action.payload;
                break;
            case types.GET_JOB_ROLES_BY_FIELD_ID_FAIL:
                draft.jobRoles = [];
                break;

                
            default:
                break;
        }
    });
}
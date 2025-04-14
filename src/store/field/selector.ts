import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../interface";
import { initialState } from "./contants";
import { get } from "lodash";

export const selectField = (state: AppState) => state.field || initialState;

// * job roles by field id
export const selectJobRolesByFieldId = createSelector([selectField], (field) => get(field, 'jobRoles', []));

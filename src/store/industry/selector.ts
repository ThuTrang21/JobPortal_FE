import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../interface";
import { initialState } from "./constants";
import { get } from "lodash";

const selectIndustry = (state: AppState) => state.industry || initialState;

export const selectIndustryList = createSelector([selectIndustry], (industries) =>
   get(industries, 'industries', []),
);

export const selectFields = createSelector([selectIndustry], (industries) =>
   get(industries, 'fields', []),
);

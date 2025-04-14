import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { get } from "lodash";
import { AppState } from "../interface";

const selectComapny = (state: AppState) => state.company || initialState

// * company info
export const selectCompanyInfo = createSelector([selectComapny], (company) => get(company, 'companyInfo', undefined));

//companies
export const selectCompanies = createSelector([selectComapny], (companies) => get(companies, 'companies', []));

// * industries
export const selectIndustriesByCompanyId = createSelector([selectComapny], (company) => get(company, 'industries', []));
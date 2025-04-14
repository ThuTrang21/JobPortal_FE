import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './constants';
import { AppState } from '../interface';

const selectUser= (state: AppState) => state.user || initialState;

export const selectUpdateUserSuccess = createSelector([selectUser], (user) =>
  get(user, 'loadingUpdateUser', false),
);
export const selectUserInfo = createSelector([selectUser], (user) =>
  get(user, 'userInfo', undefined),
);

export const selectCompany = createSelector([selectUser], (user) =>
  get(user, 'company', undefined),
);

export const selectIndustries = createSelector([selectUser], (user) =>
  get(user, 'industries', []),
);
import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './constants';
import { AppState } from '../interface';

const selectAuthStore = (state: AppState) => state.auth || initialState;

// * authenticated
export const selectLoadingUserInfo = createSelector([selectAuthStore], (app) =>
  get(app, 'loadingUserInfo', false),
);

export const selectErrorRefreshToken = createSelector([selectAuthStore], (app) =>
  get(app, 'errorRefreshToken', {}),
);

// * logout
export const selectLoadingLogout = createSelector([selectAuthStore], (app) =>
  get(app, 'loadingLogout', false),
);
export const selectErrorLogout = createSelector([selectAuthStore], (app) =>
  get(app, 'errorLogout', {}),
);

export const selectLoadingLogin = createSelector([selectAuthStore], (login) =>
  get(login, 'loadingLogin', false),
);

export const selectErrorLogin = createSelector([selectAuthStore], (login) =>
  get(login, 'errorLogin', {}),
);

// * register
export const selectLoadingRegister = createSelector([selectAuthStore], (register) =>
  get(register, 'loadingRegister', false),
);

export const selectErrorRegister = createSelector([selectAuthStore], (register) =>
  get(register, 'errorRegister', {}),
);

export const selectRegisterInfo = createSelector([selectAuthStore], (register) =>
  get(register, 'registerInfo', {}),
);

export const selectSuccessRegister = createSelector([selectAuthStore], (register) =>
  get(register, 'successRegister', false),
);

//login
export const selectLoginSuccess = createSelector([selectAuthStore], (login) =>
  get(login, 'loginSuccess', false),
);
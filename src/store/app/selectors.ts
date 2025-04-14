
import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './constants';
import { AppState } from '../interface';

const selectAppStore = (state: AppState) => state.app || initialState;

export const selectNavigate = createSelector([selectAppStore], (app) => get(app, 'navigate'));

// * upload images
export const selectLoadingUploadImages = createSelector([selectAppStore], (app) =>
  get(app, 'loadingUploadImages', false),
);
export const selectUploadedImages = createSelector([selectAppStore], (app) =>
  get(app, 'uploadedImages', []),
);
export const selectErrorUploadImages = createSelector([selectAppStore], (app) =>
  get(app, 'errorUploadImages', {}),
);

//get province
export const selectProvinces = createSelector([selectAppStore], (app) =>
  get(app, 'provinces', []),
);

//get district
export const selectDistricts = createSelector([selectAppStore], (app) =>
  get(app, 'districts', []),
);

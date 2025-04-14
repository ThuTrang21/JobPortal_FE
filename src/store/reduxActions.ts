import { createAction } from "redux-actions";

// Type
export const createActionTypes = (type: string) => [
  `${type}_REQUEST`,
  `${type}_REQUEST_SUCCESS`,
  `${type}_REQUEST_FAIL`,
];

// Action
export const createReduxAction = (type: string) => createAction(type);

export const createReduxActions = (type: string) => [
  createAction(`${type}`),
  createAction(`${type}_SUCCESS`),
  createAction(`${type}_FAIL`),
];

/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, map } from 'lodash';
import store from './configureStore';

export const getLoadingType = (payload: any) => {
  const isInit = get(payload, 'isInit', false);
  const isSearch = get(payload, 'isSearch', false);
  const isLoadMore = get(payload, 'isLoadMore', false);
  const isReloading = get(payload, 'isReloading', false);

  return {
    isInit,
    isSearch,
    isLoadMore,
    isReloading,
  };
};

export const dispatchWaitAction = async (action: any) => {
  return await new Promise((resolve) => {
    store.dispatch({
      type: action.type,
      ...(action?.payload && { payload: action?.payload }),
      onComplete: ({ error, cancelled, data }: any) => {
        resolve({ error, cancelled, data });
      },
    });
  });
};

export const dispatchWaitActions = async (actions: any = []) => {
  return await Promise.all(map(actions, async (action) => await dispatchWaitAction(action)));
};

export const dispatchAction = (action: any) => {
  store.dispatch(action);
};

export const dispatchActions = (actions: any = []) => {
  map(actions, (action) => dispatchAction(action));
};

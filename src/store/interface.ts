/* eslint-disable @typescript-eslint/no-explicit-any */
import store from './configureStore';
import rootReducer from './rootReducer';


export interface IAction {
  type: string;
  payload?: any; 
}


export type RootReducer = typeof rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;


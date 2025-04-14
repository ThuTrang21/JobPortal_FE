import storage from 'redux-persist/lib/storage';
import { persistReducer, PersistConfig } from 'redux-persist';
import rootReducer from './rootReducer';
import { RootState } from './rootReducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export default persistedReducer;
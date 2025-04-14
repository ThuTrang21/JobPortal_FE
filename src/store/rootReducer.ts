import authReducer from './auth/reducer';
import appReducer from './app/reducer';
import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import industryReducer from './industry/reducer';
import companyReducer from './company/reducer';
import { fieldReducer } from './field/reducer';
import jobReducer from './job/reducer';



const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    industry: industryReducer,
    company:companyReducer,
    field:fieldReducer,
    job:jobReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

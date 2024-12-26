import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

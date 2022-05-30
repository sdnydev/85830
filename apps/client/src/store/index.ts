import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import authenticationReducer from '../authentication/authentication.slice';
import { api } from './services/api.service';
import { RootState } from './types';

export const combinedReducers = combineReducers({
  [api.reducerPath]: api.reducer,
  authentication: authenticationReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'authentication/logout') {
    state = {} as RootState;
  }

  return combinedReducers(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  devTools: import.meta.env.MODE === 'development',
});

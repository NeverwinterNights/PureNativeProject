import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import {appReducer} from './appReducer';
import { authReducer, ErrorType } from "./authReducer";
import { contactsReducer } from "./contactsReducer";



const rootReducer = combineReducers({
  appReducer: appReducer,
  authReducer:authReducer,
  contactsReducer:contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




export type ThunkError = {
  rejectValue: ErrorType
}

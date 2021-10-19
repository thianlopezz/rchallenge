import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const ENABLE_REDUX_DEV_TOOLS = true;

const store = configureStore({
  reducer: rootReducer,
  devTools: ENABLE_REDUX_DEV_TOOLS,
  middleware: [thunk]
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;

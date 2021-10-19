import { combineReducers } from '@reduxjs/toolkit';
import { reducer as datesReducer } from '../slices/dates';
import { reducer as reminderReducer } from '../slices/reminder';
import { reducer as weatherReducer } from '../slices/weather';

const rootReducer = combineReducers({
  dates: datesReducer,
  reminder: reminderReducer,
  weather: weatherReducer
});
export default rootReducer;

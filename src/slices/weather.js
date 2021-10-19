import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = process.env.REACT_APP_WEATHER_URL || 'http://dataservice.accuweather.com';
const apikey = process.env.REACT_APP_WEATHER_APIKEY;

const init = {
  loading: false,
  cities: [],
  weathers: []
};

const slice = createSlice({
  name: "weather",
  initialState: init,
  reducers: {
    getCities(state, action) {
      state.loading = true;
    },
    getCitiesSuccess(state, action) {
      state.loading = false;
      state.cities = [...action.payload];
    },
    getCitiesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getCityWeather(state, action) {
      state.loading = true;
    },
    getCityWeatherSuccess(state, action) {
      state.loading = false;
      state.weathers = [...action.payload];
    },
    getCityWeatherError(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const getCities = (cityDesc, onSuccess) => async (dispatch) => {
    dispatch(slice.actions.getCities());
    try {
      
      const response = await axios.get(
        `${baseurl}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${cityDesc}`
      );

      const { data } = response;

      if (data) {
        dispatch(slice.actions.getCitiesSuccess(data));
      } else {
        dispatch(slice.actions.getCitiesError(new Error('Data is undefined')));
      }
    } catch (e) {
      dispatch(slice.actions.getCitiesError(e));
    }  
};

export const getCityWeather = (cityKey, onSuccess) => async (dispatch) => {
    dispatch(slice.actions.getCityWeather());
    try {
      
      const response = await axios.get(
        `${baseurl}/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}`
      );
      
      const { data } = response;

      if (data.DailyForecasts) {
        dispatch(slice.actions.getCityWeatherSuccess(data.DailyForecasts));
      } else {
        dispatch(slice.actions.getCityWeatherError(new Error('Data is undefined')));
      }
    } catch (e) {
      dispatch(slice.actions.getCityWeatherError(e));
    }  
};

export const setCityWeather = (weathers) => async (dispatch) => {
  slice.actions.getCityWeatherSuccess(weathers);
};

export const reducer = slice.reducer;

export default slice;

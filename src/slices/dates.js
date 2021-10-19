import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const dayList = (() => {
  let mockArray = new Array(7).fill(1);
  return mockArray.map((_, index) => {
    return dayjs().day(index).format("dddd");
  });
})();

const init = {
  today: dayjs(),
  currentMonth: dayjs(),
  dayList
};

const slice = createSlice({
  name: "dates",
  initialState: init,
  reducers: {
    nextMonth(state, action) {
      state.loading = true;
      state.currentMonth = dayjs(state.currentMonth).add(1, "month");
    },
    previousMonth(state, action) {
      state.currentMonth = dayjs(state.currentMonth).subtract(1, "month");
    }
  }
});

export const nextMonth = () => async (dispatch) => {
  dispatch(slice.actions.nextMonth());
};

export const previousMonth = () => async (dispatch) => {
  dispatch(slice.actions.previousMonth());
};

export const reducer = slice.reducer;

export default slice;

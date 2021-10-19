import { createSlice } from "@reduxjs/toolkit";

const init = {
  submitting: false,
  reminders: []
};

const slice = createSlice({
  name: "reminder",
  initialState: init,
  reducers: {
    saveReminder(state, action) {
      state.submitting = true;
    },
    saveReminderSuccess(state, action) {
      state.submitting = false;

      if (!action.payload._id) {

        let lastId = 0;

        if(state.reminders.length > 0) {
          lastId = state.reminders[state.reminders.length - 1]._id;
        }

        lastId++;

        state.reminders = [
          ...state.reminders,
          { ...action.payload, _id: lastId }
        ];
      } else {
        let index = state.reminders.findIndex(reminder=> reminder._id == action.payload._id);
        state.reminders[index] = action.payload;
        state.reminders = [...state.reminders];
      }
    }
  }
});

export const saveReminder = (reminder, onSuccess) => async (dispatch) => {
  dispatch(slice.actions.saveReminder());
  setTimeout(() => {
    dispatch(slice.actions.saveReminderSuccess(reminder));
    onSuccess();
  }, 1000);
};

export const reducer = slice.reducer;

export default slice;

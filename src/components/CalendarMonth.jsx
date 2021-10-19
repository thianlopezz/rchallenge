import React from "react";
import PropTypes from "prop-types";
import CalendarDay from "./CalendarDay";
import { useDispatch, useSelector } from "../store";
import dayjs from "dayjs";
import { nextMonth, previousMonth } from "../slices/dates";

function CalendarMonth({ onNewReminder, onReminderClick }) {
  const dispatch = useDispatch();
  const { dayList, currentMonth } = useSelector((state) => state.dates);
  const { reminders } = useSelector((state) => state.reminder);

  let startingDate = (() => {
    let startingDate = dayjs(currentMonth).date(1);

    while (startingDate.format("dddd") != dayList[0]) {
      startingDate = startingDate.subtract(1, "days");
    }

    return startingDate;
  })();

  const noWeeks = new Array(7).fill(1);

  const findReminders = (date) => {
    return reminders.filter(
      (reminder) =>
        dayjs(reminder.date).format("YYYYMMDD") ==
        dayjs(date).format("YYYYMMDD")
    );
  };

  return (
    <div>
      <div className="flex  my-2">
        <button
          type="button"
          className="flex-none w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => dispatch(previousMonth())}
        >
          Previous
        </button>
        <h2 className="flex-1 text-center text-3xl">
          {dayjs(currentMonth).format("MMMM YYYY")}
        </h2>

        <button
          type="button"
          className="flex-none w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => dispatch(nextMonth())}
        >
          Next
        </button>
      </div>
      <hr className="my-2" />
      {noWeeks.map((_, index) => {
        if (index == 0) {
          return (
            <div className="grid grid-cols-7 gap-4 mb-4">
              {dayList.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
          );
        } else {
          return (
            <div className="grid grid-cols-7 gap-4 mb-4">
              {dayList.map((day) => {
                let inputDate = startingDate;
                startingDate = startingDate.add(1, "day");
                let reminders = findReminders(inputDate);
                return (
                  <CalendarDay
                    key={day + index}
                    dateDayjs={inputDate}
                    currentMonth={currentMonth}
                    onNewReminder={() => onNewReminder(inputDate)}
                    onReminderClick={(reminder) =>
                      onReminderClick(inputDate, reminder)
                    }
                    reminders={reminders}
                  />
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

CalendarMonth.propTypes = {
  onNewReminder: PropTypes.func.isRequired,
  onReminderClick: PropTypes.func.isRequired
};

export default CalendarMonth;
